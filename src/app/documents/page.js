'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { supabase } from '@/utils/supabase';

export default function Documents() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(ROUTES.HOME);
    } else if (status === 'authenticated') {
      fetchDocuments();
    }
  }, [status, router]);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error fetching documents:', error);
    } else {
      setDocuments(data);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${session.user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
    } else {
      const { data, error: insertError } = await supabase
        .from('documents')
        .insert({
          name: file.name,
          path: filePath,
          user_id: session.user.id,
        });

      if (insertError) {
        console.error('Error inserting document record:', insertError);
      } else {
        fetchDocuments();
      }
    }
  };

  const handleDelete = async (documentId) => {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId);

    if (error) {
      console.error('Error deleting document:', error);
    } else {
      fetchDocuments();
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="mb-6 text-2xl font-bold">Your Documents</h1>
        <input type="file" onChange={handleUpload} className="mb-4" />
        {documents.length === 0 ? (
          <p>You haven't uploaded any documents yet.</p>
        ) : (
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between rounded border p-2"
              >
                <span>{doc.name}</span>
                <div>
                  <Button variant="outline" className="mr-2">
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(doc.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
