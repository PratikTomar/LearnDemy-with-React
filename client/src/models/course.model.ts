export class CourseModel {
  constructor(
    public id: number = 0,
    public title: string = "",
    public trainerName: string = "",
    public rating: number = 0,
    public badge:string = '',
    public actualPrice: number = 0,
    public discountedPrice: number = 0,
    public imageUrl: string = "",
    public reviews: number=0,
    public description: string = "",
  ) {}
}
  