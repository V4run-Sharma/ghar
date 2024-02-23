import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, [listing.userRef]);

  return (
    <main>
      {owner && (
        <div className="flex flex-wrap gap-2 items-start justify-end">
          <textarea
            name=""
            id=""
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            rows={3}
            cols={50}
            width={"max-content"}
            placeholder={`Contact ${owner.username} for ${listing.name}`}
            className="px-2 py-[7px] border-[1px] rounded-lg w-full"></textarea>
          <Link
            to={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${message}`}>
            <button className="px-4 py-2 bg-green-600 rounded-lg text-white hover:opacity-80 transition-all ease-in-out">
              Send Message
            </button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Contact;
