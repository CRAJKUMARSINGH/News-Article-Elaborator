import { ProcessedFile } from '../lib/fileProcessor';
import { FileText, Image as ImageIcon, FileArchive, File } from 'lucide-react';

interface ArticleContentProps {
  files: ProcessedFile[];
}

export default function ArticleContent({ files }: ArticleContentProps) {
  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No content to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {files.map((file) => (
        <div key={file.id} className="border border-border rounded-sm p-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <FileIcon type={file.type} name={file.name} />
            <h3 className="font-sans font-semibold text-lg text-foreground">
              {file.name}
            </h3>
          </div>
          
          {file.type.startsWith('image/') ? (
            <div className="mt-4">
              <img
                src={file.content}
                alt={file.name}
                className="max-w-full h-auto rounded-sm border border-border"
              />
            </div>
          ) : (
            <div className="mt-4 prose prose-sm max-w-none">
              <div className="bg-secondary/30 p-4 rounded-sm font-sans text-sm whitespace-pre-wrap">
                {file.content}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FileIcon({ type, name }: { type: string; name: string }) {
  if (type.startsWith('image/')) {
    return <ImageIcon className="text-accent" size={24} />;
  }
  if (type.startsWith('text/') || name.endsWith('.txt') || name.endsWith('.md')) {
    return <FileText className="text-accent" size={24} />;
  }
  if (name.endsWith('.zip') || name.endsWith('.rar')) {
    return <FileArchive className="text-accent" size={24} />;
  }
  return <File className="text-accent" size={24} />;
}
