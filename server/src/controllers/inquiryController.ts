import type { NextFunction, Request, RequestHandler, Response } from 'express';
import * as inquiryService from '../services/inquiryService.js';
import { getParamId } from '../utils/request.js';
import type {
  CreateInquiryInput,
  InquiryQueryInput,
  UpdateInquiryStatusInput,
} from '../validators/inquiryValidator.js';

function asCreateBody(req: Request): CreateInquiryInput {
  return req.body as CreateInquiryInput;
}

function asStatusBody(req: Request): UpdateInquiryStatusInput {
  return req.body as UpdateInquiryStatusInput;
}

function asQuery(req: Request): InquiryQueryInput {
  return req.query as unknown as InquiryQueryInput;
}

export const createInquiry: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inquiry = await inquiryService.createInquiry(asCreateBody(req));

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getInquiries: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await inquiryService.listInquiries(asQuery(req));

    res.status(200).json({
      success: true,
      message: 'Inquiries retrieved successfully',
      data: result.inquiries,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getInquiryById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inquiry = await inquiryService.getInquiryById(getParamId(req));

    res.status(200).json({
      success: true,
      message: 'Inquiry retrieved successfully',
      data: inquiry,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const updateInquiryStatus: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inquiry = await inquiryService.updateInquiryStatus(getParamId(req), asStatusBody(req));

    res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: inquiry,
    });
  } catch (error: unknown) {
    next(error);
  }
};
