// import mongoose from "mongoose";
// import { SourceModel } from "../schemas/source.schema";

// const sources = [
//   { name: "dantri", url: "https://dantri.com.vn/" },
//   {
//     name: "vnexpress",
//     url: "https://vnexpress.net/",
//   },
// ];

// export const seedSources = async (uri: string) => {
//   try {
//     await mongoose.connect(uri);

//     for (const source of sources) {
//       const existingSource = await SourceModel.findOne({ name: source.name });

//       if (!existingSource) {
//         await SourceModel.create(source);
//         console.log(`Inserted: ${source.name}`);
//       } else {
//         console.log(`Skipped (already exists): ${source.name}`);
//       }
//     }

//     console.log("Seeding completed!");
//     await mongoose.disconnect();
//   } catch (error) {
//     console.error("Error seeding sources:", error);
//     process.exit(1);
//   }
// };

import { SourceDocument } from "../schemas/source.schema";
import { Model } from "mongoose";

const sources = [
  { name: "dantri", url: "https://dantri.com.vn/" },
  { name: "vnexpress", url: "https://vnexpress.net/" },
];

export const seedSources = async (sourceModel: Model<SourceDocument>) => {
  try {
    for (const source of sources) {
      const existingSource = await sourceModel.findOne({ name: source.name });

      if (!existingSource) {
        await sourceModel.create(source);
        console.log(`Inserted: ${source.name}`);
      } else {
        console.log(`Skipped (already exists): ${source.name}`);
      }
    }

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding sources:", error);
  }
};
