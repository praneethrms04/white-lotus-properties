import mongoose from 'mongoose';
import env from '../config/env.js';
import Inquiry from '../models/Inquiry.js';
import Property from '../models/Property.js';
import {
  SEED_INQUIRIES,
  SEED_INQUIRY_EMAILS,
  SEED_PROPERTIES,
  SEED_PROPERTY_SLUGS,
} from './seedData.js';

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

async function resetDemoData(): Promise<void> {
  const confirmation = process.env.CONFIRM_SEED_RESET;

  if (confirmation !== 'YES') {
    throw new Error(
      'Demo reset refused. Re-run with --reset and CONFIRM_SEED_RESET=YES (development only).'
    );
  }

  if (env.nodeEnv === 'production') {
    throw new Error('Demo reset is blocked in production.');
  }

  const properties = await Property.find({ slug: { $in: SEED_PROPERTY_SLUGS } }).select('_id');
  const propertyIds = properties.map((property) => property._id);

  const inquiryDelete = await Inquiry.deleteMany({
    $or: [{ email: { $in: SEED_INQUIRY_EMAILS } }, { property: { $in: propertyIds } }],
  });

  const propertyDelete = await Property.deleteMany({ slug: { $in: SEED_PROPERTY_SLUGS } });

  console.log(
    `Reset demo data: removed ${propertyDelete.deletedCount} properties and ${inquiryDelete.deletedCount} inquiries.`
  );
}

async function upsertProperties(): Promise<Map<string, mongoose.Types.ObjectId>> {
  const slugToId = new Map<string, mongoose.Types.ObjectId>();

  for (const seed of SEED_PROPERTIES) {
    const property = await Property.findOneAndUpdate(
      { slug: seed.slug },
      { $set: seed },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    );

    if (!property) {
      throw new Error(`Failed to upsert property: ${seed.slug}`);
    }

    slugToId.set(seed.slug, property._id);
    console.log(`Upserted property: ${seed.name}`);
  }

  return slugToId;
}

async function upsertInquiries(
  slugToId: Map<string, mongoose.Types.ObjectId>
): Promise<void> {
  for (const seed of SEED_INQUIRIES) {
    const propertyId = slugToId.get(seed.propertySlug);

    if (!propertyId) {
      throw new Error(`Missing property for inquiry seed: ${seed.propertySlug}`);
    }

    await Inquiry.findOneAndUpdate(
      { email: seed.email, property: propertyId },
      {
        $set: {
          property: propertyId,
          name: seed.name,
          email: seed.email,
          phone: seed.phone,
          message: seed.message,
          status: seed.status,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    );

    console.log(`Upserted inquiry: ${seed.name} → ${seed.propertySlug}`);
  }
}

async function main(): Promise<void> {
  const shouldReset = hasFlag('--reset');

  console.log(`Connecting to MongoDB (${env.nodeEnv})...`);
  await mongoose.connect(env.mongoUri);
  console.log(`Connected: ${mongoose.connection.host}/${mongoose.connection.name}`);

  if (shouldReset) {
    await resetDemoData();
  }

  const slugToId = await upsertProperties();
  await upsertInquiries(slugToId);

  const propertyCount = await Property.countDocuments({ slug: { $in: SEED_PROPERTY_SLUGS } });
  const inquiryCount = await Inquiry.countDocuments({ email: { $in: SEED_INQUIRY_EMAILS } });

  console.log('Seed complete.');
  console.log(`Demo properties: ${propertyCount}`);
  console.log(`Demo inquiries: ${inquiryCount}`);
}

main()
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : 'Unknown seed error';
    console.error(`Seed failed: ${message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
