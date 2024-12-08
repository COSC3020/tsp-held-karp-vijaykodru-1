function tsp_hk(distance_matrix) {
    // Base case where there is only one or no entries in the distance_matrix
    if (distance_matrix.length <= 1) {
        return 0;
    }

    var cache = {}; // memoization

    function heldKarp(cities, start) {
        var key = JSON.stringify(cities) + start;

        // Return cached result if available
        if (cache[key] !== undefined) {
            return cache[key];
        }

        // if there are only two cities
        if (cities.length === 2) {
            const otherCity = cities.find(city => city !== start);
            return distance_matrix[start][otherCity];
        }
        //Assuming maximum distance between the cities
        let minDistance = Infinity;
        for (const nextCity of cities) {
            if (nextCity === start) continue;

            // remove the starting city
            const reducedCities = cities.filter(city => city !== start);
            
            // calculate the distance
            const distance = heldKarp(reducedCities, nextCity) + distance_matrix[start][nextCity];
            minDistance = Math.min(minDistance, distance);
        }
        // Store the result
        cache[key] = minDistance;
        return minDistance;
    }

    // Initialize the remaining cities
    const remaining = Array.from({ length: distance_matrix.length }, (_, i) => i);

    let shortestTour = Infinity;

    // Compute the shortest tour by trying each city as the starting point
    for (const startCity of remaining) {
        shortestTour = Math.min(shortestTour, heldKarp(remaining, startCity));
    }

    return shortestTour;
}
