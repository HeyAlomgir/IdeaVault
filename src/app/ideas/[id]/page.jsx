"use client"
import Image from 'next/image';
import { Button, Avatar } from "@heroui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const IdeyaDetailsPage =() => {
    const {id} = useParams();
    const [idyad,setIdyad]=useState(null);
    const [comments,setComments]=useState([]);
    const [newComment,setNewComment]=useState("");
// step 1
        useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:5000/idya/${id}`)
            .then(res => res.json())
            .then(data => setIdyad(data));

        fetch(`http://localhost:5000/comments/${id}`)
            .then(res => res.json())
            .then(data => setComments(data));
    }, [id]);

    // step 2

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const sampleComment = {
            ideaId: id,
            userName: "Ahsan Habib",
            commentText: newComment,
            timestamp: new Date().toLocaleTimeString()
        }; 

        const res = await fetch("http://localhost:5000/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sampleComment)
        });
        const data = await res.json();
        
        if (data.insertedId) {
            setComments([...comments, sampleComment]); 
            setNewComment(""); 
        }
    };

    if (!idyad) {
        return <p className="text-center py-20 font-bold text-blue-600 animate-pulse">Loading vault details...</p>;
    }
    const { ideaTitle, category, shortDescription, targetAudience, estimatedBudget, imageUrl, problemStatement, proposedSolution } = idyad;

    return (
        <div className='max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 bg-white text-slate-800 min-h-screen'>

            <div className="md:col-span-2 space-y-5">
                <span className="text-[11px] font-black uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">{category}</span>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{ideaTitle}</h1>

                <div className="relative w-full h-1/2 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                    <Image src={imageUrl || "https://unsplash.com"} fill className="object-cover" alt={ideaTitle} />
                </div>

                <div className="space-y-4 pt-2 text-sm text-gray-600 font-medium leading-relaxed">
                    <p><strong>Target Audience:</strong> {targetAudience}</p>
                    <p><strong>Estimated Budget:</strong> <span className="text-green-600 font-bold">{estimatedBudget || "N/A"}</span></p>
                    <p><strong>Summary:</strong> {shortDescription}</p>
                    <p className="bg-red-50/50 p-4 rounded-xl border border-red-50 text-slate-700"><strong>⚠️ Problem:</strong> {problemStatement}</p>
                    <p className="bg-green-50/50 p-4 rounded-xl border border-green-50 text-slate-700"><strong>✅ Solution:</strong> {proposedSolution}</p>
                </div>
            </div>

                       {/* right side */}
            <div className="md:col-span-1 bg-gray-50 p-5 rounded-2xl border border-gray-100 h-fit space-y-5">
                <h3 className="font-black text-slate-900 text-base">Public Discussions</h3>
                
                {/* কমেন্ট লেখার ফর্ম */}
                <form onSubmit={handlePostComment} className="space-y-2.5">
                    <textarea 
                        placeholder="Write your feedback..." 
                        rows={3} 
                        required 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)} 
                        className="w-full bg-white text-sm font-medium p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                    <Button type="submit" color="primary" className="w-full font-bold rounded-xl bg-blue-600 text-white text-xs h-10">
                        Post Comment
                    </Button>
                </form>

                {/* databse theke asa commet loop  */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {comments && comments.length === 0 ? (
                        <p className="text-center text-xs text-gray-400 font-semibold py-4">No comments yet.</p>
                    ) : (
                        comments && comments.map((comment, index) => (
                            <div key={index} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm space-y-1">
                                <div className="flex items-center gap-2">
                                    <Avatar src="https://pravatar.cc" size="sm" className="w-6 h-6" />
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800 leading-none">{comment.userName}</h4>
                                        <span className="text-[8px] text-gray-400 block mt-0.5">{comment.timestamp}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 pl-0.5 font-medium pt-1">{comment.commentText}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>


        </div>
    );
};

export default IdeyaDetailsPage;
