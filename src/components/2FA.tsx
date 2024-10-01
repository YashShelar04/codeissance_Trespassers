// pages/index.tsx
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Platform {
  name: string;
  url: string;
  tfa: {
    sms: boolean;
    phone: boolean;
    email: boolean;
    software: boolean;
    hardware: boolean;
  };
}

export default function Home() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );

  const fetchPlatforms = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://2fa.directory/api/v3/all.json");
      setPlatforms(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load platform data.");
    }
    setLoading(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const platform = platforms.find((p) =>
      p.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setSelectedPlatform(platform || null);
  };

  React.useEffect(() => {
    fetchPlatforms();
  }, []);

  const renderTFAStatus = (platform: Platform) => {
    const { sms, phone, email, software, hardware } = platform.tfa;

    if (sms || phone || email || software || hardware) {
      return (
        <ul className="list-disc pl-5">
          {sms && <li>SMS-based 2FA</li>}
          {phone && <li>Phone-based 2FA</li>}
          {email && <li>Email-based 2FA</li>}
          {software && <li>Software-based 2FA (e.g., Authenticator app)</li>}
          {hardware && <li>Hardware-based 2FA (e.g., Security keys)</li>}
        </ul>
      );
    }

    return <p>This platform does not support two-factor authentication.</p>;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">2FA Checker</h1>
      <p>
        Search for a platform to check if it has two-factor authentication
        enabled:
      </p>
      <Input
        type="text"
        placeholder="Search for a platform..."
        value={searchTerm}
        onChange={handleSearch}
        className="mt-4 mb-4"
      />
      {loading && <p>Loading platform data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {selectedPlatform ? (
        <div>
          <h2 className="text-xl font-semibold">
            Platform: {selectedPlatform.name}
          </h2>
          <p>
            Website:{" "}
            <a
              href={selectedPlatform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {selectedPlatform.url}
            </a>
          </p>
          <div className="mt-4">
            <h3 className="font-semibold">2FA Status:</h3>
            {renderTFAStatus(selectedPlatform)}
          </div>
        </div>
      ) : (
        searchTerm && <p>No platform found with that name.</p>
      )}
    </div>
  );
}
