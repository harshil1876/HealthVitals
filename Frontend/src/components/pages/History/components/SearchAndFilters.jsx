import React, { useState } from 'react';
import { Search, Filter, X as LucideX, Activity, AlertTriangle, Pill, Brain, Heart, Clock } from 'lucide-react';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';

const SearchAndFilters = ({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFiltersChange,
  onClearFilters,
  totalResults 
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const healthCategories = [
    { id: 'vital-signs', label: 'Vital Signs', icon: <Activity size={16} /> },
    { id: 'symptoms', label: 'Symptoms', icon: <AlertTriangle size={16} /> },
    { id: 'medication', label: 'Medication', icon: <Pill size={16} /> },
    { id: 'mental-health', label: 'Mental Health', icon: <Brain size={16} /> },
    { id: 'general', label: 'General Health', icon: <Heart size={16} /> }
  ];

  const durationRanges = [
    { id: 'short', label: 'Short (< 5 min)', min: 0, max: 300 },
    { id: 'medium', label: 'Medium (5-15 min)', min: 300, max: 900 },
    { id: 'long', label: 'Long (> 15 min)', min: 900, max: null }
  ];

  const handleCategoryToggle = (categoryId) => {
    const updatedCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  const handleDurationToggle = (durationId) => {
    const updatedDurations = filters.durations.includes(durationId)
      ? filters.durations.filter(id => id !== durationId)
      : [...filters.durations, durationId];
    
    onFiltersChange({
      ...filters,
      durations: updatedDurations
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.durations.length > 0) count++;
    if (filters.hasHealthData) count++;
    return count;
  };

  return (
    <div className="bg-background border-b border-border">
      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-text-secondary" />
          </div>
          <Input
            type="search"
            placeholder="Search conversations, transcripts, or health topics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button
              variant={showAdvancedFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter size={16} />
              Filters
              {getActiveFiltersCount() > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>

            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-text-secondary"
              >
                <LucideX size={14} />
                Clear All
              </Button>
            )}
          </div>

          <div className="text-sm text-text-secondary">
            {totalResults} conversation{totalResults !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="bg-surface rounded-medical-lg border border-border p-4 animate-slide-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Health Categories */}
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Health Categories</h3>
                <div className="space-y-2">
                  {healthCategories.map((category) => (
                    <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                      {category.icon}
                      <span className="text-sm text-text-primary">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Date Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">From</label>
                    <Input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">To</label>
                    <Input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Duration & Options */}
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Duration</h3>
                <div className="space-y-2 mb-4">
                  {durationRanges.map((duration) => (
                    <label key={duration.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.durations.includes(duration.id)}
                        onChange={() => handleDurationToggle(duration.id)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm text-text-primary">{duration.label}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasHealthData}
                      onChange={(e) => onFiltersChange({
                        ...filters,
                        hasHealthData: e.target.checked
                      })}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-text-primary">Has Health Data</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters; 