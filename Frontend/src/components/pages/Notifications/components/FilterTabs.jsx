import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const FilterTabs = ({ filter, setFilter }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
            className="rounded-lg px-4 py-2 text-base font-semibold"
          >All</Button>
          <Button 
            variant={filter === 'unread' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('unread')}
            className="rounded-lg px-4 py-2 text-base font-semibold"
          >Unread</Button>
          <Button 
            variant={filter === 'high' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('high')}
            className="rounded-lg px-4 py-2 text-base font-semibold"
          >Urgent</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterTabs; 