import React, { useEffect, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { transformForChroma } from "../utils/DataForChroma";

export default function Body() {
  const fileInputRef = useRef();
  const [jsonData, setJsonData] = useState(null);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          console.log("Parsed Data:", data);
  
          // Transform data immediately
          const chromaRepresentation = transformForChroma(data?.superteam_vietnam || []);
          console.log("Chroma Representation: ", chromaRepresentation);
  
          setJsonData(chromaRepresentation); // Updates state asynchronously
        } catch (error) {
          console.error("Invalid JSON file:", error);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid JSON file.");
    }
  };
  
  // 🔥 Use useEffect to trigger fetch when jsonData updates
  useEffect(() => {
    if (!jsonData) return; // Avoid running on initial render
  
    console.log("jsonData Updated: ", jsonData);
  
    const sendData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-collection`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
  
        console.log("res", res);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        const data = await res.json();
        console.log("Response Data:", data);
      } catch (error) {
        console.error("Error creating collection:", error.message);
      }
    };
  
    sendData();
  }, [jsonData]); // Runs only when jsonData updates
  
  const handleClick = () => {
    fileInputRef.current.click();
  };
  
  // const fileInputRef = useRef();
  // const [jsonData, setJsonData] = useState([]);

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.type === "application/json") {
  //     console.log("filee");
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       try {
  //         const data = JSON.parse(e.target.result);
  //         setJsonData(data?.superteam_vietnam);
  //         console.log(data)
  //         console.log("jsonDataa",jsonData)
  //       } catch (error) {
  //         console.error("Invalid JSON file:", error);
  //       }
  //     };
  //     reader.readAsText(file);
  //   } else {
  //     alert("Please upload a valid JSON file.");
  //   }

  //   console.log("JSONNNN: ", jsonData)

  //   const chromaRepresentation = transformForChroma(jsonData);
  //   console.log("Chroma Representation: ", chromaRepresentation);

  // //   try {
  // //     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-collection`, {
  // //       method: "POST",
  // //       headers: {
  // //         "Content-Type": "application/json",
  // //       },
  // //       body: JSON.stringify(chromaRepresentation),
  // //     });
  // //     console.log("res", res)

  // //     if (!res.ok) {
  // //       throw new Error(`HTTP error! Status: ${res.status}`);
  // //     }

  // //     const data = await res.json();
  // //     console.log(data);
  // //   } catch (error) {
  // //     console.error("Error creating collection:", error.message);
  // //   }
  // };

  return (
    <div className="bg-[#FB9B0E] h-[calc(100vh-12.5vh)] flex justify-center">
      <div className="flex items-center flex-col gap-3 justify-center">
        <p className="text-white text-center flex items-center font-bold text-[35px]">
          Superteam Vietnam Admin Dashboard
        </p>
        <p>Full Website Coming Soon, Anticipate!!!!</p>
        <button
          onClick={handleClick}
          className="w-40 h-12 flex items-center gap-2 justify-center bg-[#091521] rounded-lg text-white"
        >
          <MdOutlineFileUpload size={25} /> <span>Upload File</span>
        </button>
        {/* Hidden file input */}
        <input
          ref={fileInputRef} // Attach the ref to the input
          type="file"
          className="hidden"
          accept="application/json"
          onChange={handleFileChange} // Handle the file change
        />
      </div>
    </div>
  );
}
