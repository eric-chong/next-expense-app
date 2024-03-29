export type SuccessResponse = {
  success: boolean;
  data: any;
};

export type ErrorResponse = {
  success: boolean;
  errors: string[];
  message: string;
};

export type ActionResponse = SuccessResponse | ErrorResponse;
