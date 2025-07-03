import React, { useState } from "react";

interface AddTaskProps {
  addTask: (title: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setIsSubmitting(true);

      // Simulate API delay for loading state
      await new Promise(resolve => setTimeout(resolve, 500));

      addTask(title);
      setTitle("");
      setIsExpanded(false);
      setIsSubmitting(false);
    }
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setTitle("");
    setIsExpanded(false);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="What needs to be done?"
            disabled={isSubmitting}
            className={`input-modern focus-ring transition-all duration-300 ${
              isExpanded ? 'scale-101' : ''
            } ${isSubmitting ? 'state-loading cursor-not-allowed' : ''}`}
          />

          {/* Input icon with enhanced animations */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <div className={`transition-all duration-300 ${
              isSubmitting ? 'animate-spin' : 'group-hover:scale-110 group-hover:rotate-90'
            }`}>
              {isSubmitting ? (
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-400 transition-colors duration-200 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Expanded form with smooth animations */}
        {isExpanded && (
          <div className="space-y-4 animate-fade-in-up">

            {/* Action buttons with enhanced interactions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className={`
                  btn-ghost text-sm interactive-scale focus-ring
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>

              <div className="flex space-x-3">

                <button
                  type="submit"
                  disabled={!title.trim() || isSubmitting}
                  className={`
                    btn-modern text-sm interactive-scale focus-ring relative overflow-hidden
                    ${!title.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Task
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick submit for non-expanded form */}
        {!isExpanded && title.trim() && (
          <div className="flex justify-end animate-fade-in">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                btn-modern text-sm interactive-scale focus-ring
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Task
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTask;
