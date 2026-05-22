"use client";
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, ListBox, TextArea, TextField, Select, Card } from "@heroui/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaRocket } from "react-icons/fa";


const AddIdeaPage = () => {
    

    const {
        data: session,
    } = authClient.useSession();
    const user = session?.user;
    // console.log(user);

       useEffect(() => {
        document.title = "Add Idea | IdeaVault"; 
    }, []);

    const handleSubmit = async (e) => {
          document.title = "add idya | IdeaVault";

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const idyaVault = {
            ...Object.fromEntries(formData.entries()),
            userId: user?.id,
            userEmail: user?.email,
            userName: user?.name
        };

      console.log(idyaVault);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idya`, {
                method: "POST",
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(idyaVault)
            });
            const idyas = await res.json();
            // console.log(idyas)
            if (idyas.insertedId) {
                e.target.reset();
                toast.success("Startup idea added successfully!");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Something went wrong. Please try again.");
        }

        e.target.reset();
        toast.success("Added successfully!")
    };
    return (
        
        <div className="container mx-auto px-6 py-10 bg-white min-h-[60vh]">
            <h1 className="text-2xl font-black text-slate-900 mb-2">Submit Your Startup Idea</h1>
            <p className="text-sm text-gray-500">Pitch your concept to the global community.</p>

            <Card>
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-50/50 p-6 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl shadow-slate-100/50 animate-[pulse_3s_infinite]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Idea Title*/}
                        <div className="md:col-span-2">
                            <TextField name="ideaTitle" >
                                <Label>Idea Title</Label>
                                <Input placeholder="e.g., Smart Crop Monitor " className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Target Audience */}
                        <TextField name="targetAudience" >
                            <Label>Target Audience</Label>
                            <Input placeholder="e.g., Developers, Local Farmers" className="rounded-2xl" />
                            <FieldError />
                        </TextField>


                        <div>
                            <Select
                                name="category"
                                
                                className="w-full"
                                placeholder="Select category"
                            >
                                <Label>Category</Label>
                                <Select.Trigger className="rounded-2xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Tech" textValue="Tech">Tech</ListBox.Item>
                                        <ListBox.Item id="Health" textValue="Health">Health</ListBox.Item>
                                        <ListBox.Item id="AI" textValue="AI">AI</ListBox.Item>
                                        <ListBox.Item id="Education" textValue="Education">Education</ListBox.Item>
                                        <ListBox.Item id="FinTech" textValue="FinTech">FinTech</ListBox.Item>
                                        <ListBox.Item id="AgriTech" textValue="AgriTech">AgriTech</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/*  Estimated Budget (Optional) */}
                        <TextField name="imatedBudgetest" type="text">
                            <Label>Estimated Budget (Optional)</Label>
                            <Input
                                placeholder="e.g., $5,000"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Tags (Optional) */}
                        <TextField name="tags">
                            <Label>Tags (Optional)</Label>
                            <Input
                                placeholder="e.g., saas, iot, automation"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Image URL */}
                        <div className="md:col-span-2">
                            <TextField name="imageUrl" >
                                <Label>Concept Image URL</Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com"
                                    className="rounded-2xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Short Description */}
                        <div className="md:col-span-2">
                            <TextField name="shortDescription" >
                                <Label>Short Description</Label>
                                <TextArea
                                    placeholder="Summarize your startup concept in 2-3 sentences..."
                                    className="rounded-3xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Problem Statement */}
                        <div className="md:col-span-2">
                            <TextField name="problemStatement" >
                                <Label>Problem Statement</Label>
                                <TextArea
                                    placeholder="What painful problem are you trying to solve?"
                                    className="rounded-3xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Proposed Solution */}
                        <div className="md:col-span-2">
                            <TextField name="proposedSolution" >
                                <Label>Proposed Solution</Label>
                                <TextArea
                                    placeholder="How exactly does your platform fix this problem uniquely?"
                                    className="rounded-3xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Detailed Description */}
                        <div className="md:col-span-2 mb-10">
                            <TextField name="detailedDescription" >
                                <Label>Detailed Description</Label>
                                <TextArea
                                    placeholder="Elaborate on the core features, workflow and business model..."
                                    className="rounded-3xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>
                    </div>

                    {/* submit */}
                    <Button
                        type="submit"
                        className="rounded-2xl w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 transition-colors text-sm"
                    >
                        <FaRocket /> Pitch Startup Idea to Vault

                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AddIdeaPage;
