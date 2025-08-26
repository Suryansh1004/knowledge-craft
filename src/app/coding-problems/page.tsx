// src/app/coding-problems/page.tsx
"use client";

import { useState, useMemo } from 'react';
import { codingProblems as allProblems } from '@/data/codingProblems';
import type { CodingProblem } from '@/types';
import { Compiler } from '@/components/coding/Compiler';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { List, Code, CheckSquare, ExternalLink, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function CodingProblemsPage() {
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem | null>(allProblems[0] || null);
  const [platformFilter, setPlatformFilter] = useState<string>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const platforms = ["All", ...new Set(allProblems.map(p => p.platform))];
  const difficulties = ["All", ...new Set(allProblems.map(p => p.difficulty))];

  const filteredProblems = useMemo(() => {
    return allProblems.filter(problem => {
      const matchesPlatform = platformFilter === "All" || problem.platform === platformFilter;
      const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter;
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (problem.tags && problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchesPlatform && matchesDifficulty && matchesSearch;
    });
  }, [platformFilter, difficultyFilter, searchTerm]);

  const handleSelectProblem = (problem: CodingProblem) => {
    setSelectedProblem(problem);
  };
  
  const getPlatformLink = (problem: CodingProblem) => {
    // This is a mock, actual links would be more complex
    if (problem.platform === "LeetCode") return `https://leetcode.com/problems/${problem.slug}/`;
    if (problem.platform === "HackerRank") return `https://www.hackerrank.com/challenges/${problem.slug}/`;
    return "#";
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-3">Coding Practice Zone</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Sharpen your coding skills with a variety of problems from popular platforms. Select a problem and start coding!
        </p>
      </div>

      <div className="mb-8 p-4 border rounded-lg bg-card shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-1.5">
             <label htmlFor="search-problems" className="text-sm font-medium text-muted-foreground flex items-center"><Search className="w-4 h-4 mr-1.5"/>Search Problems</label>
            <Input 
              id="search-problems"
              type="text" 
              placeholder="Search by title or tag..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="platform-filter" className="text-sm font-medium text-muted-foreground flex items-center"><Filter className="w-4 h-4 mr-1.5"/>Platform</label>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger id="platform-filter" className="w-full">
                <SelectValue placeholder="Filter by platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map(platform => (
                  <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div className="space-y-1.5">
            <label htmlFor="difficulty-filter" className="text-sm font-medium text-muted-foreground flex items-center"><Filter className="w-4 h-4 mr-1.5"/>Difficulty</label>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger id="difficulty-filter" className="w-full">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <Card className="shadow-lg h-full max-h-[calc(100vh-12rem)] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-primary"><List className="mr-2 h-5 w-5" /> Problem List</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto pr-2 space-y-3">
              {filteredProblems.length > 0 ? filteredProblems.map(problem => (
                <Button
                  key={problem.id}
                  variant={selectedProblem?.id === problem.id ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-2.5 shadow-sm"
                  onClick={() => handleSelectProblem(problem)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{problem.title}</span>
                    <div className="text-xs opacity-80 flex items-center gap-2 mt-1">
                      <Badge variant={selectedProblem?.id === problem.id ? "secondary" : "outline"} className="px-1.5 py-0.5 text-xs">{problem.platform}</Badge>
                      <Badge 
                        variant={selectedProblem?.id === problem.id ? "secondary" : "outline"} 
                        className={`px-1.5 py-0.5 text-xs ${
                          problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-800 dark:text-green-200 dark:border-green-700' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-800 dark:text-yellow-200 dark:border-yellow-700' :
                          'bg-red-100 text-red-700 border-red-200 dark:bg-red-800 dark:text-red-200 dark:border-red-700'
                        }`}
                      >{problem.difficulty}</Badge>
                    </div>
                  </div>
                </Button>
              )) : <p className="text-muted-foreground text-sm p-4 text-center">No problems match your filters.</p>}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          {selectedProblem ? (
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="description"><Code className="mr-2 h-4 w-4" />Description</TabsTrigger>
                <TabsTrigger value="solution"><CheckSquare className="mr-2 h-4 w-4" />My Solution</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">{selectedProblem.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{selectedProblem.platform}</Badge>
                      <Badge 
                        variant="outline"
                        className={`${
                          selectedProblem.difficulty === 'Easy' ? 'border-green-500 text-green-600' :
                          selectedProblem.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-600' :
                          'border-red-500 text-red-600'
                        }`}
                      >{selectedProblem.difficulty}</Badge>
                       <Link href={getPlatformLink(selectedProblem)} target="_blank" rel="noopener noreferrer" className="flex items-center text-accent hover:underline">
                        View on {selectedProblem.platform} <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                    <p>{selectedProblem.description}</p>
                    {selectedProblem.tags && (
                      <div className="mt-4">
                        <strong>Tags:</strong> {selectedProblem.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="ml-1">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="solution">
                <Compiler problem={selectedProblem} />
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Select a Problem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Choose a problem from the list to view its description and start coding.</p>
                <Code className="w-24 h-24 text-muted-foreground/30 mx-auto mt-8" />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
