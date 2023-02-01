// import { FOODS, friesList, saladList } from '@/DUMMY_DATA/foods';
// import { Food, FoodAttrs, FoodDoc } from '@/models/Food';
// import dbConnect from '@/utils/db/dbConnect';
// import { Types } from 'mongoose';
// import type { NextApiRequest, NextApiResponse } from 'next';

// type foodsData = {
//   foods?: (FoodDoc & {
//     _id: Types.ObjectId;
//   })[];
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<foodsData>
// ) {
//   await dbConnect();

//   if (req.method === 'GET') {
//     console.log('get');
//     const foods = await Food.find({});
//     if (!foods) return;

//     res.status(200).json({ foods });
//   }

//   try {
//     const allFoods = [...saladList, ...friesList];
//     const foods = allFoods.map((food) =>
//       Food.build({
//         name: food.name,
//         category: food.category,
//         price: food.price,
//         coverImage: food.coverImage,
//         integredients: food.integredients,
//         comments: ['test'],
//         likes: food.likes.length < 1 ? ['test'] : food.likes,
//         details: food.details,

//         images: food.images || ['test'],
//       })
//     );

//     console.log('before save');
//     foods.map(async (doc) => {
//       await doc.save();
//     });

//     // await Food.insertMany(foods);
//     res.status(200).json({});
//   } catch (error) {
//     console.log(error, 'inserMany');
//   }
// }
