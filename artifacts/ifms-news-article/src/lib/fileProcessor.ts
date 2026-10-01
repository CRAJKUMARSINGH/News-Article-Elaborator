export interface ProcessedFile {
  id: string;
  name: string;
  type: string;
  content: string;
  size: number;
}

export async function processFile(file: File): Promise<ProcessedFile> {
  const id = `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  
  // Handle text files
  if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
    const text = await file.text();
    return {
      id,
      name: file.name,
      type: file.type,
      content: text,
      size: file.size
    };
  }
  
  // Handle images - create a data URL for display
  if (file.type.startsWith('image/')) {
    const dataUrl = await readFileAsDataURL(file);
    return {
      id,
      name: file.name,
      type: file.type,
      content: dataUrl,
      size: file.size
    };
  }
  
  // Handle PDFs - for now, just store metadata
  if (file.type === 'application/pdf') {
    return {
      id,
      name: file.name,
      type: file.type,
      content: `[PDF Document: ${file.name} - ${formatFileSize(file.size)}]`,
      size: file.size
    };
  }
  
  // Handle archives
  if (file.name.endsWith('.zip') || file.name.endsWith('.rar')) {
    return {
      id,
      name: file.name,
      type: file.type,
      content: `[Archive: ${file.name} - ${formatFileSize(file.size)}]`,
      size: file.size
    };
  }
  
  // Default fallback
  return {
    id,
    name: file.name,
    type: file.type,
    content: `[File: ${file.name} - ${formatFileSize(file.size)}]`,
    size: file.size
  };
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function processFiles(files: File[]): Promise<ProcessedFile[]> {
  const processedFiles = await Promise.all(
    files.map(file => processFile(file))
  );
  return processedFiles;
}
