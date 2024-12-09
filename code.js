function tsp_hk(distance_matrix) {
 
    // If there is only one or no city return 0
    if (distance_matrix.length <= 1) {
        return 0;
    }

    // dp will store the minimum distance to visit the cities in mask
    //sets the ditance to be infinity
    const dp = Array(1 << distance_matrix.length).fill().map(() => Array(distance_matrix.length).fill(Infinity));

    //starting from each city and visiting only that city
    for (let i = 0; i < distance_matrix.length; i++) {
        dp[1 << i][i] = 0;
    }

    // Iterate over all possible subsets of cities (represented by 'mask')
    for (let mask = 1; mask < (1 << distance_matrix.length); mask++) {
        for (let last = 0; last < distance_matrix.length; last++) {
            // Continue if last city is not in the current mask
            if ((mask & (1 << last)) === 0) {
                continue;
            }

            // Try to find the minimum distance by visiting a new city 'next'
            for (let next = 0; next < distance_matrix.length; next++) {
                if (next === last || (mask & (1 << next)) !== 0) {
                    continue;
                }

                const newMask = mask | (1 << next);
                dp[newMask][next] = Math.min(dp[newMask][next], dp[mask][last] + distance_matrix[last][next]);
            }
        }
    }

    // Find the minimum distance to visit all cities
    let minTourDistance = Infinity;
    for (let i = 0; i < distance_matrix.length; i++) {
        minTourDistance = Math.min(minTourDistance, dp[(1 << distance_matrix.length) - 1][i]);
    }
    return minTourDistance;
}
