"use client"
import Image from 'next/image';
import { Button, Avatar } from "@heroui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const IdeyaDetailsPage = () => {

      const {
        data: session,
    } = authClient.useSession() ;
    const user = session?.user;
    // console.log(user);

    const { id } = useParams();
    const [idyad, setIdyad] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    // step 1
    useEffect(() => {
        if (!id) return;

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idya/${id}`)
            .then(res => res.json())
            .then(data => setIdyad(data));

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`)
            .then(res => res.json())
            .then(data => setComments(data));
    }, [id]);

    // step 2

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        toast.success("succesfull post comment!");

        const sampleComment = {
            ideaId: id,
            userName: user?.name,
            userEmail:user?.email,
            commentText: newComment,
            timestamp: new Date().toLocaleTimeString()
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, {
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


    // delte coment
    const handleDeleteComment = async (commentId) => {
        // const confirmDelete = window.confirm("Are you sure you want to delete this comment permanently?");
        toast.success("delete this comment permanently !");
        // if (!confirmDelete) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${commentId}`, {
                method: "DELETE"
            });
            const data = await res.json();

            setComments(comments.filter(cmt => cmt._id !== commentId));
        } catch (error) {
            console.error("Delete error:", error);
        }
    };


    


    // update cmt
    const handleUpdateComment = async (commentId) => {
        if (!editText.trim()) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${commentId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ commentText: editText })
            });
            const data = await res.json();

            if (data.modifiedCount > 0) {

                const updatedComments = comments.map(cmt => cmt._id === commentId ? { ...cmt, commentText: editText } : cmt);
                setComments(updatedComments);
                setEditingId(null);
                toast.success("Successsfull your update comment !")

            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

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

                {/* cmt from */}
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

                {/* database theke asa comment loop */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {comments && comments.length === 0 ? (
                        <p className="text-center text-xs text-gray-400 font-semibold py-4">No comments yet.</p>
                    ) : (
                        comments && comments.map((comment, index) => (
                            <div key={index} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar src={comment.userPhoto || "https://pravatar.cc"} size="sm" className="w-6 h-6" />
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-800 leading-none">{comment.userName}</h4>
                                            <span className="text-[8px] text-gray-400 block mt-0.5">{comment.timestamp}</span>
                                        </div>
                                    </div>

                                    {/* btn */}
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                        <button
                                            type="button"
                                            onClick={() => { setEditingId(comment._id); setEditText(comment.commentText); }}
                                            className="hover:text-blue-600 p-0.5 transition-colors"
                                        >
                                            <FaEdit size={19} className='text-yellow-500' />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteComment(comment._id)}
                                            className="hover:text-red-500 p-0.5 transition-colors"
                                        >
                                            <FaTrash size={19} className='text-danger' />
                                        </button>
                                    </div>
                                </div>

                              
                                {editingId === comment._id ? (
                                    <div className="space-y-1.5 mt-1">
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="w-full text-xs font-medium p-1.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                                        />
                                        <div className="flex gap-1 justify-end">
                                            <button type="button" onClick={() => setEditingId(null)} className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Cancel</button>
                                            <button type="button" onClick={() => handleUpdateComment(comment._id)} className="text-[9px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded">Save</button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-600 pl-0.5 font-medium leading-relaxed">{comment.commentText}</p>
                                )}
                            </div>
                        ))
                    )}
                </div>

            </div>


        </div>
    );
};

export default IdeyaDetailsPage;
