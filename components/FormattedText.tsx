import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface FormattedTextProps {
  text: string;
  style?: any;
}

export default function FormattedText({ text, style }: FormattedTextProps) {
  // Custom markdown styles
  const markdownStyles = {
    body: {
      color: '#1F2937',
      fontSize: 15,
      lineHeight: 22,
    },
    strong: {
      fontWeight: 'bold',
      color: '#1F2937',
    },
    em: {
      fontStyle: 'italic',
      color: '#1F2937',
    },
    bullet_list: {
      marginVertical: 4,
    },
    ordered_list: {
      marginVertical: 4,
    },
    list_item: {
      marginVertical: 2,
    },
    paragraph: {
      marginVertical: 4,
    },
    heading1: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1F2937',
      marginVertical: 8,
    },
    heading2: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1F2937',
      marginVertical: 6,
    },
    heading3: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1F2937',
      marginVertical: 4,
    },
    code_inline: {
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
      fontFamily: 'monospace',
      fontSize: 14,
    },
    code_block: {
      backgroundColor: '#F3F4F6',
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
    },
    blockquote: {
      borderLeftWidth: 4,
      borderLeftColor: '#3B82F6',
      paddingLeft: 12,
      marginVertical: 8,
      fontStyle: 'italic',
      color: '#6B7280',
    },
  };

  return (
    <View style={[styles.container, style]}>
      <Markdown style={markdownStyles}>
        {text}
      </Markdown>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 