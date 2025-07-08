'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { LuClock, LuFilter, LuSearch, LuTrendingUp } from 'react-icons/lu';
import { classNames } from '@/lib/utils';
import { FiX } from 'react-icons/fi';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category?: string;
  url?: string;
  type?: 'article' | 'example' | 'documentation' | 'community';
  tags?: string[];
  popularity?: number;
}

export interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  results?: SearchResult[];
  isLoading?: boolean;
  showFilters?: boolean;
  showRecentSearches?: boolean;
  recentSearches?: string[];
  popularSearches?: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SearchComponent = React.forwardRef<HTMLDivElement, SearchProps>(
  (
    {
      placeholder = 'Search...',
      onSearch,
      onResultSelect,
      results = [],
      isLoading = false,
      showFilters = false,
      showRecentSearches = true,
      recentSearches = [],
      popularSearches = [],
      className,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const resultsRef = React.useRef<HTMLDivElement>(null);

    const sizeClasses = {
      sm: 'h-9 text-sm',
      md: 'h-11 text-base',
      lg: 'h-14 text-lg',
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      setSelectedIndex(-1);
      onSearch?.(value);
      setIsOpen(value.length > 0 || showRecentSearches);
    };

    const handleResultClick = (result: SearchResult) => {
      setQuery(result.title);
      setIsOpen(false);
      onResultSelect?.(result);
    };

    const handleRecentSearchClick = (search: string) => {
      setQuery(search);
      onSearch?.(search);
      setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          } else if (query) {
            onSearch?.(query);
            setIsOpen(false);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    };

    const clearSearch = () => {
      setQuery('');
      setIsOpen(false);
      onSearch?.('');
      inputRef.current?.focus();
    };

    const getResultIcon = (type?: string) => {
      switch (type) {
        case 'article':
          return '📄';
        case 'example':
          return '🎨';
        case 'documentation':
          return '📚';
        case 'community':
          return '👥';
        default:
          return '🔍';
      }
    };

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={ref} className={classNames('relative w-full', className)} {...props}>
        {/* Search Input */}
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(query.length > 0 || showRecentSearches)}
            placeholder={placeholder}
            className={classNames(
              'w-full rounded-lg border border-gray-300 pl-10 pr-12 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900',
              sizeClasses[size],
              className
            )}
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 transform items-center space-x-2">
            {showFilters && (
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <LuFilter className="h-4 w-4" />
              </Button>
            )}
            {query && (
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={clearSearch}>
                <FiX className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Results Dropdown */}
        {isOpen && (
          <Card className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-hidden border-0 shadow-xl">
            <Card.Content className="p-0">
              <div ref={resultsRef} className="max-h-96 overflow-y-auto">
                {/* Loading State */}
                {isLoading && (
                  <div className="p-4 text-center text-gray-500">
                    <div className="mx-auto mb-2 h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
                    Searching...
                  </div>
                )}

                {/* Search Results */}
                {!isLoading && results.length > 0 && (
                  <div>
                    <div className="border-b px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Search Results
                    </div>
                    {results.map((result, index) => (
                      <div
                        key={result.id}
                        className={classNames(
                          'cursor-pointer border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-gray-50',
                          selectedIndex === index && 'bg-gray-50'
                        )}
                        onClick={() => handleResultClick(result)}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="mt-0.5 flex-shrink-0 text-lg">
                            {getResultIcon(result.type)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center space-x-2">
                              <h4 className="truncate font-medium text-gray-900">{result.title}</h4>
                              {result.category && (
                                <Badge variant="outline" className="text-xs">
                                  {result.category}
                                </Badge>
                              )}
                            </div>
                            <p className="line-clamp-2 text-sm text-gray-600">
                              {result.description}
                            </p>
                            {result.tags && result.tags.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {result.tags.slice(0, 3).map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {!isLoading && query && results.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <LuSearch className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                    <h3 className="mb-2 font-medium text-gray-900">No results found</h3>
                    <p className="text-sm">
                      Try adjusting your search terms or browse our categories.
                    </p>
                  </div>
                )}

                {/* Recent Searches */}
                {!query && showRecentSearches && recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center border-b px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <LuClock className="mr-1 h-3 w-3" />
                      Recent Searches
                    </div>
                    {recentSearches.slice(0, 5).map((search, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-between px-4 py-2 transition-colors hover:bg-gray-50"
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        <span className="text-gray-700">{search}</span>
                        <LuSearch className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Popular Searches */}
                {!query && popularSearches.length > 0 && (
                  <div>
                    <div className="flex items-center border-b px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <LuTrendingUp className="mr-1 h-3 w-3" />
                      Popular Searches
                    </div>
                    {popularSearches.slice(0, 5).map((search, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-between px-4 py-2 transition-colors hover:bg-gray-50"
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        <span className="text-gray-700">{search}</span>
                        <LuTrendingUp className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  }
);

SearchComponent.displayName = 'Search';

export { SearchComponent as Search };
