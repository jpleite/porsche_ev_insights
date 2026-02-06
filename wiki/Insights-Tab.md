# Insights Tab

The Insights tab provides AI-style analysis of your driving patterns, offering personalized recommendations, predictions, and optimization tips.

## Purpose

This tab answers questions like:
- What type of driver am I?
- What patterns should I be aware of?
- How can I improve my efficiency?
- What will my driving cost me over time?
- What specific tips apply to my situation?

## Driving Profile Banner

At the top of the tab, a prominent banner classifies your driving profile and shows your efficiency rating.

### Profile Types

**Urban Commuter**
- Primary use is daily commuting
- Regular patterns on weekdays
- Mix of short and medium trips
- Peak activity during rush hours

**Mixed Use**
- Combination of commuting and leisure
- Variable trip lengths
- Activity throughout the week
- No dominant pattern

**Highway Cruiser**
- Significant long-distance driving
- Higher average speeds
- Longer average trip distances
- Less frequent but longer trips

### Efficiency Rating

A 1-5 star rating based on how your actual consumption compares to your vehicle's WLTP or EPA rating:

| Stars | Performance vs WLTP/EPA |
|-------|---------------------|
| 5 stars | Better than WLTP/EPA |
| 4 stars | Within 10% of WLTP/EPA |
| 3 stars | Within 20% of WLTP/EPA |
| 2 stars | Within 30% of WLTP/EPA |
| 1 star | More than 30% above WLTP/EPA |

### WLTP or EPA Comparison

Shows the percentage difference between your real-world consumption and the official WLTP or EPA rating for your vehicle model.

## Dynamic Insights

Based on your data, the dashboard generates relevant insights. You'll only see insights that apply to your driving patterns.

### Daily Commuter Detection

**Appears when:** 30% or more of your trips occur during commute hours (7-9 AM or 5-7 PM)

**What it means:** Your primary use is commuting

**Recommendations:**
- Set up scheduled charging for overnight
- Precondition the car before your morning commute
- Consider workplace charging if available

### Short Trip Warning

**Appears when:** Over 40% of your trips are under 10 km

**What it means:** Many short trips reduce overall efficiency

**The problem:** Short trips don't allow the battery and motor to reach optimal temperature, and offer less opportunity for regenerative braking.

**Recommendations:**
- Combine multiple errands into single trips
- Walk or bike for very short distances
- If you must take short trips, try to chain them together

The insight shows the efficiency difference between your short trips and longer trips.

### Weekend Tripper Detection

**Appears when:** Weekend distance is 2x or more than weekday average

**What it means:** You drive significantly more on weekends

**Recommendations:**
- Consider charging to a higher percentage before weekends
- Plan routes to maximize efficiency
- Use trip planning apps for longer weekend journeys

### Winter Range Alert

**Appears when:** Winter consumption is more than 10% higher than summer

**What it means:** Cold weather significantly impacts your range

**Recommendations:**
- Use seat heating instead of cabin heating when possible
- Precondition while still plugged in
- Park in a garage to keep the battery warmer
- Expect reduced range and plan accordingly

Shows your winter vs. summer consumption difference.

### Optimal Speed Range

**Appears when:** Data shows clear efficiency differences across speed ranges

**What it means:** Identifies your sweet spot for efficient driving

Typically 40-70 km/h is most efficient for EVs, but this varies by vehicle and conditions.

### Charging Pattern Analysis

**Success scenario:** More than 6 trips per charge
- You're maximizing each charge cycle
- Good for battery longevity

**Warning scenario:** Fewer than 3 trips per charge
- You may be charging more often than needed
- Consider letting the battery go lower before charging

## Predictive Analytics

### Annual Projections

Based on your current patterns, projections for a full year:

- **Annual Distance** - Projected yearly mileage
- **Annual Trips** - Expected number of trips
- **Annual Energy** - Total kWh you'll use
- **Annual Cost** - Electricity cost projection
- **Annual Savings** - Money saved vs. petrol

### 5-Year Forecast

Projects your savings over 5 years at current rates. This helps visualize the long-term financial benefit of driving electric.

### Seasonal Predictions

Shows expected consumption for:
- **Summer average** - Warmer months consumption
- **Winter average** - Colder months consumption

### Next Month Prediction

Based on your last 3 months of data, predicts your likely distance and cost for the coming month.

## Personalized Recommendations

### Charging Optimization

Tips specific to your charging patterns:

- **Daily charging** - Whether you should charge daily or wait
- **Preconditioning** - Using climate control while plugged in
- **Off-peak timing** - Charging during cheaper rate periods
- **Potential savings** - Estimated savings from optimal charging

### Efficiency Tips

Based on your data:

- **Combine trips** - If you have many short trips
- **Optimal speed** - Your vehicle's sweet spot
- **Eco mode** - When to use efficiency modes

### Winter Optimization

If you have winter data:

- **Seat heating** - More efficient than cabin heating
- **Garage parking** - Keeps battery warmer
- **Preheating** - Timing recommendations

### Efficiency Goals

- **Target setting** - Suggested 5% improvement goal
- **Monthly tracking** - How to monitor progress
- **Seasonal adjustments** - Accounting for weather changes

## How Insights Are Generated

The dashboard analyzes your data to find patterns:

1. **Pattern Detection** - Looks for repeated behaviors
2. **Comparison** - Compares against benchmarks and your own data
3. **Threshold Checking** - Flags when metrics cross important thresholds
4. **Recommendation Matching** - Pairs findings with relevant tips

All analysis happens locally in your browser. No data is sent to any server for analysis.

## Improving Your Insights

To get more accurate and useful insights:

1. **More data is better** - Insights improve with 3+ months of data
2. **Include charging data** - Upload the Since Charge file
3. **Cover all seasons** - Seasonal insights need data from different times of year
4. **Select your vehicle** - Enables WLTP comparisons

## Limitations

The insights are based on:
- Statistical analysis of your trip data
- Comparison to general EV best practices
- Your vehicle's official specifications

They cannot account for:
- Your specific road conditions
- Your exact electricity rates
- Local climate variations
- Personal preferences and constraints

Treat recommendations as suggestions to consider, not rules to follow.

## Related Information

- For detailed efficiency analysis, see [Efficiency Tab](Efficiency-Tab)
- For cost projections, see [Costs Tab](Costs-Tab)
- For battery and charging details, see [Battery Tab](Battery-Tab)
