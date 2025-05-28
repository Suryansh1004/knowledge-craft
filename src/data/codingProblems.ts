// src/data/codingProblems.ts
import type { CodingProblem } from '@/types';

export const codingProblems: CodingProblem[] = [
  {
    id: 'lc-two-sum',
    title: 'Two Sum',
    platform: 'LeetCode',
    difficulty: 'Easy',
    description: 'Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*. You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice. You can return the answer in any order.',
    tags: ['Array', 'Hash Table'],
    slug: 'two-sum',
  },
  {
    id: 'lc-add-two-numbers',
    title: 'Add Two Numbers',
    platform: 'LeetCode',
    difficulty: 'Medium',
    description: 'You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.',
    tags: ['Linked List', 'Math', 'Recursion'],
    slug: 'add-two-numbers',
  },
  {
    id: 'hr-array-manipulation',
    title: 'Array Manipulation',
    platform: 'HackerRank',
    difficulty: 'Hard',
    description: 'Starting with a 1-indexed array of zeros and a list of operations, for each operation add a value to each of the array element between two given indices, inclusive. Once all operations are complete, return the maximum value in the array.',
    tags: ['Array', 'Prefix Sum', 'Data Structures'],
    slug: 'array-manipulation',
  },
  {
    id: 'other-fibonacci',
    title: 'Fibonacci Sequence',
    platform: 'Other',
    difficulty: 'Easy',
    description: 'Write a function to return the nth number in the Fibonacci sequence. The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.',
    tags: ['Recursion', 'Dynamic Programming', 'Math'],
    slug: 'fibonacci-sequence',
  },
];
