'use client';

import { useState } from 'react'
import TextBlock from './blocks/TextBlock'

export default function Canvas() {
  const [blocks, setBlocks] = useState([])
  const [blockIdCounter, setBlockIdCounter] = useState(0)
  const [selectedBlockId, setSelectedBlockId] = useState(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const blockType = e.dataTransfer.getData('blockType')
    
    const newBlock = {
      id: blockIdCounter,
      type: blockType,
      content: '',
      position: blocks.length
    }

    setBlocks([...blocks, newBlock])
    setBlockIdCounter(prev => prev + 1)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  // Clear selection when clicking canvas
  const handleCanvasClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedBlockId(null)
    }
  }

  const renderBlock = (block) => {
    switch (block.type) {
      case 'text':
        return (
          <TextBlock 
            initialContent={block.content}
            isSelected={selectedBlockId === block.id}
            onSelect={(e) => {
              e.stopPropagation()
              setSelectedBlockId(block.id)
            }}
          />
        )
      default:
        return `${block.type} block`
    }
  }

  return (
    <div 
      className="min-h-[800px] w-full bg-white rounded-lg shadow-sm border p-8"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleCanvasClick}
    >
      {blocks.map((block) => (
        <div key={block.id} className="mb-4">
          {renderBlock(block)}
        </div>
      ))}
      
      {blocks.length === 0 && (
        <div className="h-full flex items-center justify-center text-gray-400">
          Drag blocks here to start creating
        </div>
      )}
    </div>
  )
} 