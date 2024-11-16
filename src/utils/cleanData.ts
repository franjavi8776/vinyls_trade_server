// interface Vinyl {
//     id: number,
//     title: string,
//     year: number,
//     genre: string,
//     cover_image: string
//     style: string,
//     stock: number,
//     price: number,
//     resource_url: string
// }
// interface VinylDetails {
//     id: number;
//     artists: {
//         name: string;
//     }[];
//     artists_sort: string;
//     videos: {
//         uri: string;
//     }[];
//     tracklist: {
//         position: string;
//         type_: string;
//         title: string;
//         duration: string;
//     }[];
// }
// const cleanData = (data: Vinyl[]) => {
//     const cleanedData = data.map((vinyl) => {
//         const min: number = 5;
//         const max: number = 20;
//         const minPrice: number = 20;
//         const maxPrice: number = 70;
//         const randomDecimal: number = Math.random();
//         const stock: number = Math.floor(randomDecimal * (max - min + 1)) + min;
//         const price: number = Math.floor(randomDecimal * (maxPrice - minPrice + 1) + minPrice);
//         const cleanedItem: Vinyl = {
//             id: vinyl.id,
//             title: vinyl.title,
//             year: vinyl.year,
//             genre: vinyl.genre.toString(),
//             cover_image: vinyl.cover_image,
//             style: vinyl.style.toString(), // convert style to string
//             stock: stock,
//             price: price,
//             resource_url: vinyl.resource_url
//         }

//         return cleanedItem
//     })
//     return cleanedData;
// }
// const cleanJson = (data: VinylDetails[]) => {
//     const cleanedData = data.map(vinyl => {
//         const cleanedArtists = vinyl.artists.map(artist => ({
//             name: artist.name
//         }));

//         const cleanedVideos = Array.isArray(vinyl.videos)
//             ? vinyl.videos.map(video => ({
//                 uri: video.uri
//             }))
//             : [{uri: "No videos"}];

//         const cleanedItem: VinylDetails = {
//             id: vinyl.id,
//             artists: cleanedArtists,
//             artists_sort: vinyl.artists_sort,
//             videos: cleanedVideos,
//             tracklist: vinyl.tracklist
//         };

//         return cleanedItem;
//     });

//     return cleanedData;
// };

// export { cleanData, cleanJson };
