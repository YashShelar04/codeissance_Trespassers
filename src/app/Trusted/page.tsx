"use client";

import React, { useState } from "react";
import {
  Shield,
  UserPlus,
  Users,
  Trash2,
  Edit,
  Check,
  X,
  Phone,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export default function TrustedContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">("email");
  const [actionType, setActionType] = useState<"add" | "remove" | "edit">(
    "add",
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleAddContact = () => {
    if (contacts.length >= 3) {
      toast({
        title: "Maximum Contacts Reached",
        description: "You can add a maximum of 3 trusted contacts.",
        variant: "destructive",
      });
      return;
    }
    setActionType("add");
    setIsAddingContact(true);
    sendOTP();
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setNewContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
    setActionType("edit");
    setIsAddingContact(true);
    sendOTP();
  };

  const handleRemoveContact = (id: string) => {
    setActionType("remove");
    setIsVerifyingOTP(true);
    sendOTP();
  };

  const sendOTP = () => {
    // Simulating OTP sending
    toast({
      title: "OTP Sent",
      description: "An OTP has been sent to your registered ${otpMethod}.",
    });
  };

  const handleVerifyOTP = () => {
    // Simulating OTP verification
    if (otp === "978432") {
      if (actionType === "add") {
        const id = Math.random().toString(36).substr(2, 9);
        setContacts([...contacts, { id, ...newContact }]);
        setNewContact({ name: "", email: "", phone: "" });
        toast({
          title: "Contact Added",
          description: "The new trusted contact has been successfully added.",
        });
      } else if (actionType === "edit" && editingContact) {
        setIsEditing(true);
        toast({
          title: "OTP Verified",
          description: "You can now edit the contact details.",
        });
      } else if (actionType === "remove") {
        setContacts(
          contacts.filter(
            (contact) => contact.id !== contacts[contacts.length - 1].id,
          ),
        );
        toast({
          title: "Contact Removed",
          description: "The trusted contact has been successfully removed.",
        });
      }
      setIsAddingContact(false);
      setIsVerifyingOTP(false);
      setOTP("");
    } else {
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingContact) {
      setContacts(
        contacts.map((c) =>
          c.id === editingContact.id
            ? {
                ...editingContact,
                email: newContact.email,
                phone: newContact.phone,
              }
            : c,
        ),
      );
      setEditingContact(null);
      setIsEditing(false);
      toast({
        title: "Contact Updated",
        description: "The trusted contact has been successfully updated.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-gray-100 min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Trusted Contacts
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your trusted contacts for account recovery and security
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-400 flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Add Trusted Contact
            </CardTitle>
            <CardDescription className="text-gray-400">
              Add a new trusted contact to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddContact();
              }}
            >
              <div className="space-y-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="name" className="text-gray-300">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newContact.name}
                          onChange={(e) =>
                            setNewContact({
                              ...newContact,
                              name: e.target.value,
                            })
                          }
                          required
                          disabled={contacts.length >= 3}
                          className="bg-gray-700 text-gray-100 border-gray-600"
                        />
                      </div>
                    </TooltipTrigger>
                    {contacts.length >= 3 && (
                      <TooltipContent>
                        <p>
                          You can add a maximum of 3 trusted contacts at a time
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) =>
                      setNewContact({ ...newContact, email: e.target.value })
                    }
                    required
                    disabled={contacts.length >= 3}
                    className="bg-gray-700 text-gray-100 border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phone: e.target.value })
                    }
                    required
                    disabled={contacts.length >= 3}
                    className="bg-gray-700 text-gray-100 border-gray-600"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={contacts.length >= 3}
                >
                  Add Contact
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-400 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Trusted Contacts List
            </CardTitle>
            <CardDescription className="text-gray-400">
              View and manage your trusted contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">
                      Contact Info
                    </TableHead>
                    <TableHead className="text-right text-gray-300">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id} className="border-gray-700">
                      <TableCell className="text-gray-300">
                        {contact.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <Badge
                            variant="secondary"
                            className="w-fit flex items-center bg-gray-700 text-gray-300"
                          >
                            <Mail className="w-3 h-3 mr-1" />
                            {contact.email}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="w-fit flex items-center bg-gray-700 text-gray-300"
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            {contact.phone}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {isEditing && editingContact?.id === contact.id ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSaveEdit}
                            className="text-green-400 hover:text-green-300 hover:bg-gray-700"
                          >
                            <Check className="h-4 w-4 " />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditContact(contact)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveContact(contact.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={isAddingContact || isVerifyingOTP}
        onOpenChange={(open) => {
          setIsAddingContact(open);
          setIsVerifyingOTP(open);
          if (!open) {
            setIsEditing(false);
            setEditingContact(null);
          }
        }}
      >
        <DialogContent className="bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-gray-100">
              Verify Your Identity
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter the OTP sent to your registered {otpMethod} to {actionType}{" "}
              a trusted contact.
            </DialogDescription>
          </DialogHeader>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                  required
                  className="bg-gray-700 text-gray-100 border-gray-600"
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="otp" className="text-right text-gray-300">
                  OTP
                </Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  className="col-span-3 bg-gray-700 text-gray-100 border-gray-600"
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col items-center sm:flex-row sm:justify-between">
            {isEditing ? (
              <Button
                onClick={handleSaveEdit}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Save Changes
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleVerifyOTP}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Verify OTP
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOtpMethod(otpMethod === "email" ? "phone" : "email");
                    sendOTP();
                  }}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Get OTP on {otpMethod === "email" ? "phone" : "email"} instead
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
