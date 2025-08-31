"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Pencil, Trash, ArrowLeft } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Contact = {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  telegram_id?: string;
  message: string;
  service: string;
  due: string;
  price: number;
  status: string;
  isreached: boolean;
  created_at: string;
};

export default function MessageDetail({ id }: { id: string }) {
  const router = useRouter();

  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  // Editable fields
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<string>("No Status");
  const [due, setDue] = useState<string>("");
  const [isReached, setIsReached] = useState<boolean>(false);

  useEffect(() => {
    const fetchContact = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) console.error(error);
      if (data) {
        setContact(data as Contact);
        setPrice(data.price);
        setStatus(data.status || "No Status");
        setDue(data.due ? data.due.split("T")[0] : data.due);
        setIsReached(data.isreached);
      }
      setLoading(false);
    };

    fetchContact();
  }, [id]);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("contacts")
      .update({
        price,
        status,
        due,
        isreached: isReached,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to update");
    } else {
      alert("Updated successfully");
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("contacts").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete");
    } else {
      alert("Deleted successfully");
      router.push("/config/dashboard");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!contact) return <p className="p-4">Contact not found</p>;

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {/* Back button */}
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{contact.name}</h2>
            <div className="flex gap-3">
              <Button onClick={handleUpdate}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          {/* Sender’s Details */}
          <div>
            <h3 className="font-medium">Sender’s Details</h3>
            <p>Email: {contact.email || "—"}</p>
            <p>Phone: 0{contact.phone_number || "—"}</p>
            <p>Telegram: {contact.telegram_id || "—"}</p>
          </div>

          {/* Message */}
          <div>
            <h3 className="font-medium">Message</h3>
            <p className="whitespace-pre-wrap">{contact.message}</p>
          </div>

          {/* Service */}
          <div>
            <h3 className="font-medium">Service</h3>
            <p>{contact.service}</p>
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Due Date</Label>
              <Input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </div>
            <div>
              <Label>Budget Price</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={(val) => setStatus(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No Status">No Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isReached}
              onChange={(e) => setIsReached(e.target.checked)}
            />
            <Label>isReached</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}