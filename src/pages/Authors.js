import React, { useState } from "react";
import { useAuthors, addAuthor, updateAuthor, deleteAuthor } from "../api";

import Button from "../components/Button";

export default function Authors() {
    return(
        <h1>Hello</h1>
    );
}
//   const { loading, authors, error } = useAuthors();
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   if (error) {
//     return <p>Something went wrong: {error.message}</p>;
//   }
//
//   return (
//     <div>
//         <div>
//             <AuthorAddForm />
//         </div>
//         <div>
//           <h1>Authors List</h1>
//           {authors.map(author => (
//             <Author key={author.id} {...author} />
//           ))}
//         </div>
//     </div>
//   );
// }
//
//
// function Author(author) {
//   const { id, first_name, last_name } = author;
//   const [showUpdate, setShowUpdate] = useState(false);
//
//   return (
//     <div className={`author author-${id}`} key={id}>
//       <div className="info">
//         ({id}) {first_name} {last_name}
//         <Button className={"btn"} onClick={() => setShowUpdate(!showUpdate)}>
//           {showUpdate ? "-" : "+"}
//         </Button>
//       </div>
//       <AuthorExtended {...author} showUpdate={showUpdate} />
//     </div>
//   );
// }
//
// function AuthorExtended(props) {
//     const { id, first_name, last_name, showUpdate } = props;
//
//     const [id_input, setId] = useState(id);
//     const [first_input, setFirstName] = useState(first_name);
//     const [last_input, setLastName] = useState(last_name);
//
//     function onSubmit() {
//         updateAuthor({
//             id,
//             first_name: first_input,
//             last_name: last_input
//         });
//     }
//
//     return (
//         <div className={`author-expand ${showUpdate ? "show" : ""}`}>
//             <form>
//                 <input
//                     type="text"
//                     name="id"
//                     value={id_input}
//                     onChange={event => {
//                         setId(event.target.value);
//                     }}
//                 />
//                 <input
//                     type="text"
//                     name="first_name"
//                     value={first_input}
//                     onChange={event => {
//                         setFirstName(event.target.value);
//                     }}
//                 />
//                 <input
//                     type="text"
//                     name="last_name"
//                     value={last_input}
//                     onChange={event => {
//                         setLastName(event.target.value);
//                     }}
//                 />
//                 <Button className={"btn-warning"} onClick={onSubmit}>
//                     Update
//                 </Button>
//             </form>
//             <Button className={"btn-danger"} onClick={() => deleteAuthor(id)}>
//                 Delete
//             </Button>
//         </div>
//     );
// }
//
// function AuthorAddForm() {
//   const [id, setId] = useState("");
//   const [first_name, setFirstName] = useState("");
//   const [last_name, setLastName] = useState("");
//
//   function onSubmit() {
//     addAuthor({
//       id,
//       first_name,
//       last_name
//     });
//
//     window.location.reload();
//   }
//
//   return (
//     <div className="addAuthor">
//       Add New Author
//       <form>
//         <input
//           type="text"
//           placeholder="Author id"
//           name="id"
//           value={id}
//           onChange={event => {
//             setId(event.target.value);
//           }}
//         />
//         <input
//           type="text"
//           placeholder="First Name"
//           name="first_name"
//           value={first_name}
//           onChange={event => {
//             setFirstName(event.target.value);
//           }}
//         />
//         <input
//           type="text"
//           placeholder="Last Name"
//           name="last_name"
//           value={last_name}
//           onChange={event => {
//             setLastName(event.target.value);
//           }}
//         />
//         <Button className={"btn-success"} onClick={onSubmit}>
//           Save
//         </Button>
//       </form>
//     </div>
//   );
// }


