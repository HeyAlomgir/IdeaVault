"use client";


import { authClient } from "@/lib/auth-client";

import { Button, FieldError, Input, Label, ListBox, Modal, Surface, TextArea, TextField, Select } from "@heroui/react";

import { BiEdit } from "react-icons/bi";
import { FaRocket } from "react-icons/fa";

export function  EditModal({idyas}) {
 const {detailedDescription,proposedSolution,problemStatement,tags,imatedBudgetest,category,targetAudience,shortDescription,_id,imageUrl,ideaTitle,estimatedBudget
} = idyas;

console.log(idyas);

      const { data: session } = authClient.useSession();

     const user = session?.user;
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const idyas = Object.fromEntries(formData.entries());
        // console.log(idyas);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idya/user/${user?.id}`,{

            method:"PATCH",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(idyas)
            
        })
        const data = await res.json()
    }
    return (
        <Modal>
            <Button
                className=" px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:text-gray-300 bg-white dark:bg-slate-850 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
                <BiEdit className=" text-yellow-700" size={40} /> Edit
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">

                            </Modal.Icon>
                            <Modal.Heading>Edit</Modal.Heading>

                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="max-w-4xl mx-auto bg-gray-50/50 p-6 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl shadow-slate-100/50 animate-[pulse_3s_infinite]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {/* Idea Title*/}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={ideaTitle} name="ideaTitle" >
                                                <Label>Idea Title</Label>
                                                <Input placeholder="e.g., Smart Crop Monitor " className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Target Audience */}
                                        <TextField defaultValue={targetAudience} name="targetAudience" >
                                            <Label>Target Audience</Label>
                                            <Input placeholder="e.g., Developers, Local Farmers" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>


                                        <div>
                                            <Select
                                             defaultValue={category}
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
                                        <TextField defaultValue={estimatedBudget} name="estimatedBudget" type="text">
                                            <Label>Estimated Budget (Optional)</Label>
                                            <Input
                                                placeholder="e.g., $5,000"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Tags (Optional) */}
                                        <TextField defaultValue={tags} name="tags">
                                            <Label>Tags (Optional)</Label>
                                            <Input
                                                placeholder="e.g., saas, iot, automation"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Image URL */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={imageUrl} name="imageUrl" >
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
                                            <TextField defaultValue={shortDescription} name="shortDescription" >
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
                                            <TextField defaultValue={problemStatement} name="problemStatement" >
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
                                            <TextField defaultValue={proposedSolution} name="proposedSolution" >
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
                                            <TextField defaultValue={detailedDescription} name="detailedDescription" >
                                                <Label>Detailed Description</Label>
                                                <TextArea
                                                    placeholder="Elaborate on the core features, workflow and business model..."
                                                    className="rounded-3xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" slot="close">Edit</Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}