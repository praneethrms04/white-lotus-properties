import type { Request, Response } from 'express';

export function getHealth(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    message: 'White Lotus API is healthy',
    data: {
      service: 'white-lotus-server',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
}
