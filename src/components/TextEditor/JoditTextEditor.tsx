import dynamic from 'next/dynamic'

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false, // This line is important. It's what prevents server-side render (next JS )
})

type TextEditorProps = {
  data: string // Assuming 'data' is a string
  onChange: (newContent: string) => void // 'onChange' is a function that takes a string and returns void
}

export default function TextEditor({ data, onChange }: TextEditorProps) {
  const handleContentChange = (newContent: string) => {
    onChange(newContent) // Call the passed onChange function with the new content
  }
  return (
    <JoditEditor
      value={data}
      onBlur={handleContentChange}
      config={{
        height: '29em',
        // Add buttons to exclude the 'brush' from the toolbar
        buttons: [
          'source',
          '|',
          'bold',
          'strikethrough',
          'underline',
          'italic',
          '|',
          'ul',
          'ol',
          '|',
          'outdent',
          'indent',
          '|',
          'font',
          'fontsize',
          'paragraph',
          '|',
          'table',
          'align',
          'undo',
          'redo',
          '|',
          'hr',
          'eraser',
          '|',
          'selectall',
          'print',
        ],
        removeButtons: [
          'link',
          'image',
          'fullsize',
          'brush',
          'paint format',
          'copyformat',
        ],
      }}
    />
  )
}
