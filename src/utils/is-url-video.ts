export const isVideoUrl = (url: string): boolean => {
     // Define a set of common video extensions
     const videoExtensions = new Set([
          'mp4',
          'mkv',
          'webm',
          'mov',
          'avi',
          'flv',
          'wmv',
          'm4v',
          'mpeg',
          'mpg',
          '3gp',
     ]);

     // Extract the file extension from the URL
     const extension = url.split('.').pop()?.toLowerCase();

     // Check if the extension is in the set of video extensions
     return extension !== undefined && videoExtensions.has(extension);
}
