# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.



#### **Time Complexity**:  
  The algorithm explores all subsets of cities, which is $O(2^n)$. For each subset, we try all cities as the starting city, which involves $O(n)$ work to explore all possible next cities. For each subset, the algorithm explores all cities to find the next city to visit, so there is an $O(n)$ operation inside the recursive calls for each subset.Therefor the overall time complexity becomes $O(n^2 * 2^n)$.

#### **Memory Complexity**:  
  The memory complexity is $O(n * 2^n)$, which accounts for the memory required to store results in the cache for each combination of cities and the starting city. The cache object stores results for every possible subset of cities, requiring $O(n * 2^n)$ space. Additionally, the recursive call stack consumes $O(n)$ space, as the maximum depth of recursion is determined by the number of cities, i.e., $n$. Thus, the overall memory complexity is $O(n * 2^n)$, considering both the cache and the recursion stack, which makes up the total memory usage.



https://github.com/COSC3020/tsp-held-karp-ClaytonBrown4741/blob/main/code.js

I looked at the above repository to get an idea of how to implment memorization

https://www.youtube.com/watch?v=-JjA4BLQyqE

https://www.youtube.com/watch?v=jUYAJ72m8P0

https://www.youtube.com/watch?v=6jqlBDYNrL0

The above three videos gave me a good understanding of using the held karp algorithm for dynamic programming.

https://compgeek.co.in/held-karp-algorithm-for-tsp/

The above website gave me the idea for implementing the code alongside the given pseudocode

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice
