import { CourseModel } from "../../models/course.model";

export const getActualDiscountPrices = (cartItem: CourseModel[]) => {
  let totalCount = 0;
  let actualTotalCount = 0;
  cartItem?.forEach((item) => {
    totalCount += item.discountedPrice;
    actualTotalCount += item.actualPrice;
  });
  return { totalCount, actualTotalCount };
};
