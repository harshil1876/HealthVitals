import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, FileText, Activity, Share, Mic, HelpCircle, RotateCcw, Plus } from 'lucide-react';
import { Button } from '../../../ui/button';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  const navigate = useNavigate();

  const handleStartConversation = () => {
    navigate('/voice-conversation-dashboard');
  };

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-surface-100 rounded-full flex items-center justify-center mb-6">
          <MessageCircle size={32} className="text-text-muted" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          No conversations match your filters
        </h3>
        <p className="text-text-secondary text-center mb-6 max-w-md">
          Try adjusting your search criteria or date range to find the conversations you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={onClearFilters}
          >
            <RotateCcw size={16} />
            Clear All Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleStartConversation}
          >
            <Plus size={16} />
            Start New Conversation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-8">
        <MessageCircle size={48} className="text-primary" />
      </div>
      <h3 className="text-2xl font-heading font-semibold text-text-primary mb-3">
        No conversations yet
      </h3>
      <p className="text-text-secondary text-center mb-8 max-w-lg">
        Start your first health conversation with our AI assistant. Your conversation history, 
        transcripts, and health insights will appear here for easy access and review.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          size="lg"
          onClick={handleStartConversation}
        >
          <Mic size={20} />
          Start Your First Conversation
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/settings-preferences?tab=support')}
        >
          <HelpCircle size={20} />
          Learn How It Works
        </Button>
      </div>
      {/* Feature Highlights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="text-center p-6 bg-surface rounded-medical border border-border">
          <div className="w-12 h-12 bg-primary/10 rounded-medical flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-primary" />
          </div>
          <h4 className="font-medium text-text-primary mb-2">Full Transcripts</h4>
          <p className="text-sm text-text-secondary">
            Every conversation is automatically transcribed and searchable
          </p>
        </div>
        <div className="text-center p-6 bg-surface rounded-medical border border-border">
          <div className="w-12 h-12 bg-secondary/10 rounded-medical flex items-center justify-center mx-auto mb-4">
            <Activity size={24} className="text-secondary" />
          </div>
          <h4 className="font-medium text-text-primary mb-2">Health Insights</h4>
          <p className="text-sm text-text-secondary">
            AI extracts and organizes important health data from conversations
          </p>
        </div>
        <div className="text-center p-6 bg-surface rounded-medical border border-border">
          <div className="w-12 h-12 bg-accent/10 rounded-medical flex items-center justify-center mx-auto mb-4">
            <Share size={24} className="text-accent" />
          </div>
          <h4 className="font-medium text-text-primary mb-2">Easy Sharing</h4>
          <p className="text-sm text-text-secondary">
            Share conversations securely with healthcare providers
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState; 