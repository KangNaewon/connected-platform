# Visualization strategy

## Chart Description

### CPU Usage Trend
  - Type: Line chart
  - Description: Visualize the recent 16 CPU usage (%) over time.
  - Scope: Includes cpu and all cpu* entries.

### CPU Usage
  - Type: Pie chart
  - Description: Show the percentage breakdown of CPU usage (user, nice, system, idle, etc.).
  - Scope: Separate charts for cpu and each cpu*.

### Interrupts
  - Type: Bar chart
  - Description: Display the top 5 interrupt numbers with their counts.
  - Scope: Use the data from intr to identify the most frequent interrupts.

### SoftIRQ
  - Type: Bar chart
  - Description: Visualize the counts of SoftIRQ events across categories.
  - Scope: Use the breakdown of softirq categories.

### Memory Usage
  - Type: Area chart
  - Description: Show the memory usage trend (% used) over time.
  - Scope: Include usable_memory and swapUsed as proportions of total memory.

### Top 5 Processes That Consume Memory
  - Type: Pie chart
  - Description: Highlight the top 5 processes by memory size and aggregate the rest into "Other."
  - Scope: Use the SZ field from unitList for memory size and process names.

### VMalloc Trend Track
  - Type: Line chart
  - Description: Track the trend of cur_vmallocSize vs. init_vmallocSize over time.
  - Scope: Use data from vmallocInfo to monitor dynamic kernel memory allocation.

### Additional Information
  - Type: Table
  - Description: Present key information not visualized in charts.
  - Contents: Include btime, ctxt, processes, procs_running, procs_blocked, EFS_BufferCacheStat, and other unvisualized data fields.

## data structure
```json
{
  "time_series": ["time_1", "time_2", ..., "time_N"], // timestamps for trends

  "cpu": {
    "usage_trend": [
      {"name": "cpu", "values": [value_1, value_2, ..., value_N]}, // float (%)
      {"name": "cpu0", "values": [value_1, value_2, ..., value_N]},
      {"name": "cpu1", "values": [value_1, value_2, ..., value_N]},
      ...
    ],
    "usage_breakdown": [
      {"name": "cpu", "user": value, "nice": value, "system": value, "idle": value, ...}, // integer
      {"name": "cpu0", "user": value, "nice": value, "system": value, "idle": value, ...},
      ...
    ]
  },

  "interrupts": {
    "top_5": [
      {"index": key, "count": value}, // key: interrupt index, value: integer
      ...
    ]
  },

  "softirq": {
    "top_5": [
      {"name": key, "count": value}, // key: softirq name, value: integer
      ...
    ]
  },

  "memory": {
    "usage_trend": {
      "usable": [value_1, value_2, ..., value_N], // MiB
      "used": [value_1, value_2, ..., value_N]   // MiB (calculated as total - usable)
    },
    "top_processes": [
      {"name": "process_1", "memory_size": value}, // MiB
      {"name": "process_2", "memory_size": value},
      ...
      {"name": "Others", "memory_size": aggregated_value}
    ]
  },

  "vmalloc": {
    "current": [value_1, value_2, ..., value_N],  // MiB
    "initial": value
  },

  "additional_info": {
    "btime": value,             // boot time
    "ctxt": value,              // context switches
    "processes": value,         // total number of processes
    "procs_running": value,     // number of running processes
    "procs_blocked": value,     // number of blocked processes
    "efs_buffer_cache": {       // EFS buffer cache stats
      "current_size": value,
      "accu_shrink_size": value,
      "zspage_size": value,
      "avail_size": value,
      "comp_rate": value
    }
  }
}
```

