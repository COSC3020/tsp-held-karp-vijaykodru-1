function tsp_hk(distance_matrix) {
    const n = distance_matrix.length;
    const cache = new Map();
    

    function heldKarp(current, visited) {
        //If all cities have been visited, return the distance to the start city (city 0)
        if (visited === (1 << n) - 1) {
            return 0;
        }
        
        var key = JSON.stringify([visited, current]);
        
        // Return the cached result if it exists
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        let minDist = Infinity;
        
        // Try all cities and recursively find the shortest path from current city
        for (let nextCity = 0; nextCity < n; nextCity++) {
            // Skip cities that have already been visited
            if ((visited & (1 << nextCity)) !== 0) continue;
        
            // Recursively calculate the distance for the new state
            const dist = distance_matrix[current][nextCity] + heldKarp(nextCity, visited | (1 << nextCity));
            
            // Update the minimum distance found
            minDist = Math.min(minDist, dist);
        }
        
        // Memoize the result for this state
        cache.set(key, minDist);
        return minDist;
    }
    
    return heldKarp(0, 1 << 0);
}
    
