function tsp_hk(distance_matrix) {
    const n = distance_matrix.length;
    const cache = new Map();

    function heldKarp(current, visited) {
        // Base case: If all cities have been visited, return the distance to the start city (city 0)
        if (visited === (1 << n) - 1) {
            return 0
        }

        var key = JSON.stringify([visited, current]);

        if (cache.has(key)) {
            return cache.get(key);
        }

        let minDist = Infinity;

        for (let nextCity = 0; nextCity < n; nextCity++) {
            if ((visited & (1 << nextCity)) !== 0) continue;

            const dist = distance_matrix[current][nextCity] + heldKarp(nextCity, visited | (1 << nextCity));
            minDist = Math.min(minDist, dist);
        }

        cache.set(key, minDist);
        return minDist;
    }

    return heldKarp(0, 1 << 0);
}
