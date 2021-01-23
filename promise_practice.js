/**
Asynchronous Upload
Introduction
We want to implement a set of functions to upload random string content to a backend service.
Given:
- upload function for a single file
- array of sample files
*/
// Do Not Modify - START
const upload = (blob, cb) => {
  // randomly fire callback within 1 second.
  setTimeout(cb, Math.random() * 1000);
};

// Do Not Modify - END
const files = [
  {
    name: "test1.txt",
    fileContents: "abasdadsjadas",
  },
  {
    name: "test2.txt",
    fileContents: "asldjknaisdha",
  },
  {
    name: "test3.txt",
    fileContents: "hifhdsfyads",
  },
  {
    name: "test4.txt",
    fileContents: "kjhakjhfjhagdsjhagdkaj",
  },
  {
    name: "test5.txt",
    fileContents: "kjasdhbasd",
  },
];
/**
  Part 1: Parallel Uploads
  Implement:
  - upload function for an array of files
  - uploads all files in parallel
  - logs the array of file names at the end, in order of upload completion
  */
// Example Usage
// uploadParallel(files); // logs ⇒ ['test4.txt', 'test2.txt', ...]

// const uploadParallel = () => {
//   const uploadedArray = [];
//   files.forEach((file, index) => {
//     upload(file, () => {
//       uploadedArray.push(file.name);
//       if (file.index === files.length - 1) {
//         console.log(uploadedArray);
//       }
//     });
//   });
// };

// const uploadParallel2 = async () => {
//   const uploadArray = [];
//   const promiseArray = files.map(
//     (f) =>
//       new Promise((resolve) => {
//         upload(f, () => {
//           uploadArray.push(f);
//           resolve();
//         });
//       })
//   );
//   await Promise.all(promiseArray);
//   console.log(uploadArray);
// };

// uploadParallel2();

/**
  Part 2: Serial Uploads
  Implement:
  - upload function for an array of files
  - uploads files one at a time
  - logs after last upload finished
  */
// Example Usage
// uploadSeries(files); // logs ⇒ All files uploaded in order

// const serialUpload = async () => {
//   for (i = 0; i < files.length; i++) {
//     const fileName = files[i].name;
//     await new Promise((resolve) => {
//       upload(fileName, () => {
//         console.log(fileName);
//         resolve();
//       });
//     });
//   }
//   console.log("All files uploaded");
// };

const serialUploadRecursive = async (index) => {
  await new Promise((resolve) => {
    upload(files[index], () => {
      console.log(files[index]);
      resolve();
    });
  });
  if (files[index + 1]) {
    serialUploadRecursive(index + 1);
  }
};

const serialUploadRecursive2 = (index) => {
  upload(files[index], () => {
    console.log(files[index]);
    if (files[index + 1]) {
      serialUploadRecursive(index + 1);
    }
  });
};

serialUploadRecursive2(0);

/**
 * 
  Bonus: Concurrent Uploads
  Implement:
  - upload function for an array of files that takes a concurrency number N
  - uploads all files in as quickly as possible, but only N uploads can be
    in progress at any time
  - logs after last upload finished
  */
// Example Usage
// uploadParallel(files, 3); // logs ⇒ All files uploaded
