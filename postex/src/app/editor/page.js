'use client'

import { useState } from 'react'
import Canvas from '@/components/editor/Canvas'
import Toolbar from '@/components/editor/Toolbar'

export default function EditorPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  const blockTypes = [
    { id: 'text', label: 'Text Block', icon: '📝' },
    { id: 'image', label: 'Image', icon: '🖼️' },
    { id: 'video', label: 'Video', icon: '🎥' },
    { id: 'embed', label: 'Embed', icon: '🔗' },
    { id: 'poll', label: 'Poll', icon: '📊' },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Collapsible sidebar */}
      <div 
        className={`
          transition-all duration-300 ease-in-out
          border-r border-gray-200 bg-white
          ${isSidebarOpen ? 'w-64' : 'w-16'}
        `}
      >
        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 m-2 hover:bg-gray-100 rounded-md"
        >
          {isSidebarOpen ? '◀' : '▶'}
        </button>

        {/* Expanded Toolbar */}
        <div className={isSidebarOpen ? 'block' : 'hidden'}>
          <Toolbar blockTypes={blockTypes} />
        </div>

        {/* Collapsed Toolbar */}
        <div className={isSidebarOpen ? 'hidden' : 'block'}>
          <div className="p-4 space-y-4">
            {blockTypes.map((block) => (
              <div
                key={block.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('blockType', block.id)}
                className="text-center p-2 cursor-move hover:bg-gray-50 rounded-md
                          transition-colors duration-200"
                title={block.label}
              >
                {block.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main editing area */}
      <div className="flex-1 p-8">
        <Canvas />
      </div>
    </div>
  )
} 