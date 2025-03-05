'use client'

export default function Toolbar({ blockTypes }) {
  const handleDragStart = (e, blockType) => {
    e.dataTransfer.setData('blockType', blockType)
  }

  return (
    <div className="p-4 space-y-2">
      {blockTypes.map((block) => (
        <div
          key={block.id}
          draggable
          onDragStart={(e) => handleDragStart(e, block.id)}
          className="flex items-center p-3 bg-white rounded-lg shadow-sm 
                     border border-gray-200 cursor-move hover:bg-gray-50
                     transition-colors duration-200"
        >
          <span className="mr-2">{block.icon}</span>
          {block.label}
        </div>
      ))}
    </div>
  )
} 