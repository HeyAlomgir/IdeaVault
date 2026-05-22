// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// export const metadata = {
//     title: "My Dashboard | IdeaVault",
// };

// const MyIdeaPage = async() => {
//     const session = await auth.api.getSession({
//         headers: await headers()
//     });

//     const user = session?.user;
//     // console.log(user);

//     const res = await fetch(`http://localhost:5000/idya/{user?.id}`)
//     const idyas = await res.json();
//     console.log(idyas);
//     return (
//         <div className="container mx-auto px-6 py-10 bg-white min-h-[60vh]">
//             <h1 className="text-2xl font-black text-slate-900 mb-2">My Pitched Ideas</h1>
//             <p className="text-sm text-gray-500">Manage and update your published concepts.</p>

//             <div>
//                 {idyas.map(ida => <div key={ida._id}>
//                     {ida.userId}
//                 </div>)}
//             </div>
//         </div>
//     );
// };
 
// export default MyIdeaPage;