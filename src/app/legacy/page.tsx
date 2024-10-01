// pages/legacy-planning.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Upload,
  Trash2,
  Mail,
  Phone,
  Clock,
  Shield,
  FileUp,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface TrustedContact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  sharedWith: number[];
}

interface ContactDeliveryMethods {
  [key: number]: "email" | "sms";
}

const trustedContacts: TrustedContact[] = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+1234567890" },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1122334455",
  },
];

const LegacyPlanning: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { id: 1, name: "Will.pdf", size: "2.5 MB", sharedWith: [1, 2] },
    { id: 2, name: "Insurance.docx", size: "1.8 MB", sharedWith: [2] },
  ]);
  const [gracePeriod, setGracePeriod] = useState<number>(30);
  const [contactDeliveryMethods, setContactDeliveryMethods] =
    useState<ContactDeliveryMethods>(
      trustedContacts.reduce(
        (acc, contact) => ({ ...acc, [contact.id]: "email" }),
        {},
      ),
    );
  const [passkey, setPasskey] = useState<string>("");
  const [deathCertificate, setDeathCertificate] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          sharedWith: [],
        },
      ]);
    }
  };

  const handleFileRemove = (fileId: number) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleShareFile = (fileId: number, contactId: string) => {
    setUploadedFiles((prev) =>
      prev.map((file) => {
        if (file.id === fileId) {
          const newSharedWith = file.sharedWith.includes(Number(contactId))
            ? file.sharedWith.filter((id) => id !== Number(contactId))
            : [...file.sharedWith, Number(contactId)];
          return { ...file, sharedWith: newSharedWith };
        }
        return file;
      }),
    );
  };

  const handleDeliveryMethodChange = (
    contactId: number,
    method: "email" | "sms",
  ) => {
    setContactDeliveryMethods((prev) => ({ ...prev, [contactId]: method }));
  };

  const handleDeathCertificateUpload = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setDeathCertificate(file);
    }
  };

  const handleSubmitAccess = (event: FormEvent) => {
    event.preventDefault();
    if (passkey && deathCertificate) {
      setIsModalOpen(true);
      // Reset form
      setPasskey("");
      setDeathCertificate(null);
    } else {
      toast({
        title: "Error",
        description: "Please provide both passkey and death certificate.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-900 text-gray-100 min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Legacy Planning
        </h1>
        <p className="text-gray-400 mt-2">Manage your digital legacy</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-purple-400 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Document Management
            </CardTitle>
            <CardDescription className="text-gray-400">
              Upload and manage important documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      {file.name} ({file.size})
                    </p>
                    <p className="text-xs text-gray-500">
                      Shared with: {file.sharedWith.length} contacts
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select
                      onValueChange={(value) => handleShareFile(file.id, value)}
                    >
                      <SelectTrigger className="w-[130px] bg-gray-700 text-gray-300 border-gray-600">
                        <SelectValue placeholder="Share with" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 text-gray-300 border-gray-600">
                        {trustedContacts.map((contact) => (
                          <SelectItem
                            key={contact.id}
                            value={contact.id.toString()}
                          >
                            {contact.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleFileRemove(file.id)}
                      className="bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md inline-flex items-center transition-colors duration-300">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </div>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-blue-400 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Timed Release
            </CardTitle>
            <CardDescription className="text-gray-400">
              Set a grace period before file access is granted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="grace-period" className="text-gray-300">
                Grace Period (in days)
              </Label>
              <Slider
                id="grace-period"
                min={0}
                max={365}
                step={1}
                value={[gracePeriod]}
                onValueChange={(value) => setGracePeriod(value[0])}
                className="bg-gray-700"
              />
              <p className="text-sm text-gray-400">
                Selected grace period: {gracePeriod} days
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-green-400 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Trusted Contact Passkey Delivery
          </CardTitle>
          <CardDescription className="text-gray-400">
            Select delivery method for each trusted contact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Contact Name</TableHead>
                <TableHead className="text-gray-300">Delivery Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trustedContacts.map((contact) => (
                <TableRow key={contact.id} className="border-gray-700">
                  <TableCell className="text-gray-300">
                    {contact.name}
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={contactDeliveryMethods[contact.id]}
                      onValueChange={(value) =>
                        handleDeliveryMethodChange(
                          contact.id,
                          value as "email" | "sms",
                        )
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="email"
                          id={`email-${contact.id}`}
                          className="border-gray-500"
                        />
                        <Label
                          htmlFor={`email-${contact.id}`}
                          className="text-gray-300"
                        >
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="sms"
                          id={`sms-${contact.id}`}
                          className="border-gray-500"
                        />
                        <Label
                          htmlFor={`sms-${contact.id}`}
                          className="text-gray-300"
                        >
                          SMS
                        </Label>
                      </div>
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-yellow-400 flex items-center">
            <FileUp className="w-5 h-5 mr-2" />
            Access Deceased Person's Data
          </CardTitle>
          <CardDescription className="text-gray-400">
            Submit passkey and death certificate to request access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitAccess} className="space-y-4">
            <div>
              <Label htmlFor="passkey" className="text-gray-300">
                Passkey
              </Label>
              <Input
                id="passkey"
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="bg-gray-700 text-gray-300 border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="death-certificate" className="text-gray-300">
                Death Certificate
              </Label>
              <Input
                id="death-certificate"
                type="file"
                onChange={handleDeathCertificateUpload}
                className="bg-gray-700 text-gray-300 border-gray-600"
              />
            </div>
            <Button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Submit Request
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-gray-100">
              Request Submitted
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              The death certificate has been sent for review. If valid, you will
              get access to your trusted one's social accounts within 3-4 days
              via email.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setIsModalOpen(false)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LegacyPlanning;
