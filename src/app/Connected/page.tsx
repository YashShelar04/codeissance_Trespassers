"use client";

import React, { useState } from "react";
import {
  Bell,
  Search,
  Plus,
  AlertTriangle,
  Check,
  X,
  Link,
  Info,
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

type Service = {
  id: number;
  name: string;
  icon: string;
  status: "active" | "inactive";
  description: string;
  category: string;
  domain: string;
  email?: string;
  lastUsed?: string;
  dataAccessed?: string[];
};

type Notification = {
  id: number;
  title: string;
  message: string;
  read: boolean;
};

type NewService = {
  name: string;
  category: string;
  domain: string;
  email: string;
  password: string;
};

const initialConnectedServices: Service[] = [
  {
    id: 1,
    name: "Google",
    icon: "/google-icon.svg",
    status: "active",
    description: "Email and calendar integration",
    category: "Productivity",
    domain: "google.com",
    email: "user@example.com",
    lastUsed: "2023-06-15",
    dataAccessed: ["Email", "Calendar", "Contacts"],
  },
  {
    id: 2,
    name: "Dropbox",
    icon: "/dropbox-icon.svg",
    status: "active",
    description: "File storage and sharing",
    category: "Storage",
    domain: "dropbox.com",
    email: "user@example.com",
    lastUsed: "2023-06-14",
    dataAccessed: ["Files", "Folders"],
  },
  {
    id: 3,
    name: "Slack",
    icon: "/slack-icon.svg",
    status: "inactive",
    description: "Team communication",
    category: "Communication",
    domain: "slack.com",
    email: "user@example.com",
    lastUsed: "2023-06-10",
    dataAccessed: ["Messages", "Channels"],
  },
  {
    id: 4,
    name: "GitHub",
    icon: "/github-icon.svg",
    status: "active",
    description: "Code repository and version control",
    category: "Development",
    domain: "github.com",
    email: "user@example.com",
    lastUsed: "2023-06-15",
    dataAccessed: ["Repositories", "Issues", "Pull Requests"],
  },
  {
    id: 5,
    name: "Trello",
    icon: "/trello-icon.svg",
    status: "active",
    description: "Project management and collaboration",
    category: "Productivity",
    domain: "trello.com",
    email: "user@example.com",
    lastUsed: "2023-06-13",
    dataAccessed: ["Boards", "Cards", "Lists"],
  },
];

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New login detected",
    message: "A new login was detected on your Google account.",
    read: false,
  },
  {
    id: 2,
    title: "Dropbox storage almost full",
    message:
      "Your Dropbox storage is 90% full. Consider upgrading or freeing up space.",
    read: true,
  },
  {
    id: 3,
    title: "GitHub security alert",
    message:
      "A security vulnerability was detected in one of your repositories.",
    read: false,
  },
];

const categories = [
  "Productivity",
  "Storage",
  "Communication",
  "Development",
  "Security",
  "Analytics",
  "Marketing",
  "Finance",
  "Other",
] as const;

export default function ConnectedServices() {
  const [connectedServices, setConnectedServices] = useState<Service[]>(
    initialConnectedServices,
  );
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newService, setNewService] = useState<NewService>({
    name: "",
    category: "",
    domain: "",
    email: "",
    password: "",
  });
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const filteredServices = connectedServices.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || service.status === filterStatus),
  );

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const handleAddService = () => {
    const newId = Math.max(...connectedServices.map((s) => s.id)) + 1;
    const newServiceData: Service = {
      id: newId,
      name: newService.name,
      icon: `/placeholder.svg?height=24&width=24`,
      status: "active",
      description: `New ${newService.category} service`,
      category: newService.category,
      domain: newService.domain,
      email: newService.email,
      lastUsed: new Date().toISOString().split("T")[0],
      dataAccessed: [],
    };
    setConnectedServices([...connectedServices, newServiceData]);
    setIsAddServiceModalOpen(false);
    setNewService({
      name: "",
      category: "",
      domain: "",
      email: "",
      password: "",
    });
  };

  const toggleNotificationRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const handleDisconnect = (id: number) => {
    setConnectedServices(
      connectedServices.filter((service) => service.id !== id),
    );
  };

  const handleShowDetails = (service: Service) => {
    setSelectedService(service);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-900 text-gray-100 min-h-screen p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Connected Services
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your integrated applications and services
          </p>
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </Button>
        </div>
      </header>

      {showNotifications ? (
        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow mb-6">
          <CardHeader>
            <CardTitle className="text-gray-100">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700 last:border-b-0 ${notification.read ? "bg-gray-800" : "bg-gray-700"}`}
                  onClick={() => toggleNotificationRead(notification.id)}
                >
                  <h3 className="font-semibold text-gray-200">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {notification.message}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-900 p-4 rounded-full">
                    <Link className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-100">
                      Total Connected Services
                    </h2>
                    <p className="text-4xl font-bold text-purple-400 mt-2">
                      {connectedServices.length}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Active Services</p>
                  <p className="text-2xl font-semibold text-green-400">
                    {
                      connectedServices.filter(
                        (service) => service.status === "active",
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 mr-4">
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 border-gray-700"
              />
            </div>
            <Select
              value={filterStatus}
              onValueChange={(value: "all" | "active" | "inactive") =>
                setFilterStatus(value)
              }
            >
              <SelectTrigger className="w-[180px] bg-gray-800 text-gray-100 border-gray-700">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Dialog
              open={isAddServiceModalOpen}
              onOpenChange={setIsAddServiceModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="ml-4 bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-gray-100">
                <DialogHeader>
                  <DialogTitle className="text-gray-100">
                    Add New Service
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Enter the details of the service you want to connect.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newService.name}
                      onChange={(e) =>
                        setNewService({ ...newService, name: e.target.value })
                      }
                      className="col-span-3 bg-gray-700 text-gray-100 border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="category"
                      className="text-right text-gray-300"
                    >
                      Category
                    </Label>
                    <Select
                      value={newService.category}
                      onValueChange={(value) =>
                        setNewService({ ...newService, category: value })
                      }
                    >
                      <SelectTrigger className="col-span-3 bg-gray-700 text-gray-100 border-gray-600">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="domain"
                      className="text-right text-gray-300"
                    >
                      Domain
                    </Label>
                    <Input
                      id="domain"
                      value={newService.domain}
                      onChange={(e) =>
                        setNewService({ ...newService, domain: e.target.value })
                      }
                      className="col-span-3 bg-gray-700 text-gray-100 border-gray-600"
                      placeholder="e.g., example.com"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newService.email}
                      onChange={(e) =>
                        setNewService({ ...newService, email: e.target.value })
                      }
                      className="col-span-3 bg-gray-700 text-gray-100 border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="password"
                      className="text-right text-gray-300"
                    >
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={newService.password}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          password: e.target.value,
                        })
                      }
                      className="col-span-3 bg-gray-700 text-gray-100 border-gray-600"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleAddService}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Connect Service
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-lg font-semibold flex items-center text-gray-100">
                    {service.name}
                  </CardTitle>
                  <Badge
                    variant={
                      service.status === "active" ? "default" : "secondary"
                    }
                    className={`${service.status === "active" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}
                  >
                    {service.status === "active" ? (
                      <Check className="h-4 w-4 mr-1" />
                    ) : (
                      <X className="h-4 w-4 mr-1" />
                    )}
                    {service.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {service.description}
                  </CardDescription>
                  <p className="text-sm text-gray-500 mt-2">
                    Category: {service.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    Domain: {service.domain}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShowDetails(service)}
                      className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                    >
                      <Info className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDisconnect(service.id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Disconnect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow mt-8">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center text-gray-100">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                Security and Privacy Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                We prioritize the security and privacy of your data. Here's what
                you need to know about your connected services:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>
                  We only access the data necessary for the functionality you've
                  authorized.
                </li>
                <li>
                  Your credentials are encrypted and never stored in plain text.
                </li>
                <li>You can revoke access to any service at any time.</li>
              </ul>
              <Button
                variant="link"
                className="mt-4 p-0 text-purple-400 hover:text-purple-300"
              >
                View Full Privacy Policy
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-gray-100">Service Details</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">
                    {selectedService.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {selectedService.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">Status</p>
                  <p className="text-gray-200">{selectedService.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Category</p>
                  <p className="text-gray-200">{selectedService.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Domain</p>
                  <p className="text-gray-200">{selectedService.domain}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Connected Email
                  </p>
                  <p className="text-gray-200">{selectedService.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Last Used</p>
                  <p className="text-gray-200">{selectedService.lastUsed}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Data Accessed
                </p>
                <ul className="list-disc list-inside text-gray-200">
                  {selectedService.dataAccessed?.map((data, index) => (
                    <li key={index}>{data}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => setIsDetailsModalOpen(false)}
              className="bg-gray-700 hover:bg-gray-600 text-gray-200"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
