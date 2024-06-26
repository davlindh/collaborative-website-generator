import React from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import FileUpload from '../components/FileUpload.jsx';
import { useFiles } from '../integrations/supabase/index.js';

const FileManagement = ({ projectId }) => {
  const { data: files, isLoading, error } = useFiles(projectId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading files.</div>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>File Management</Heading>
      <Box p={4} bg="gray.100" borderRadius="md" w="full" maxW="600px" mx="auto">
        <FileUpload projectId={projectId} />
      </Box>
      <VStack spacing={4} mt={8}>
        {files.map((file) => (
          <Box key={file.id} p={4} bg="gray.100" borderRadius="md" w="full" maxW="600px" mx="auto">
            <Heading size="md" isTruncated>{file.name}</Heading>
            <Text>Uploaded by: {file.uploaded_by}</Text>
            <Text>Uploaded on: {new Date(file.uploaded_at).toLocaleDateString()}</Text>
            <Text>Version: {file.version}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default FileManagement;