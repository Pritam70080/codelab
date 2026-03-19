export const sumArrayProblem = {
  title: "Sum of Array",
  description:
    "Given an array of integers, return the sum of all elements.",
  difficulty: "EASY",
  tags: ["Array"],
  constraints: "1 <= n <= 10^5\n-10^9 <= nums[i] <= 10^9",
  hints: "Loop through array and keep adding.",
  editorial: "Simple iteration and accumulation.",
  testCases: [
    { input: "1 2 3 4 5", output: "15" },
    { input: "10 20 30", output: "60" }
  ],
  examples: {
    JAVASCRIPT: {
      input: "nums = [1,2,3,4,5]",
      output: "15"
    },
    PYTHON: {
      input: "nums = [1,2,3,4,5]",
      output: "15"
    },
    JAVA: {
      input: "nums = [1,2,3,4,5]",
      output: "15"
    }
  },

  codeSnippets: {
    JAVASCRIPT: `function sumArray(nums) {
  // Write your code here
}

// Input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(" ").map(Number);
  const result = sumArray(nums);
  console.log(result);
  rl.close();
});`,

    PYTHON: `def sum_array(nums):
    # Write your code here
    pass

# Input handling
import sys
nums = list(map(int, sys.stdin.readline().split()))
result = sum_array(nums)
print(result)`,

    JAVA: `import java.util.*;

class Main {
  public static int sumArray(int[] nums) {
    // Write your code here
    return 0;
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String[] input = sc.nextLine().split(" ");
    int[] nums = Arrays.stream(input).mapToInt(Integer::parseInt).toArray();

    int result = sumArray(nums);
    System.out.println(result);
  }
}`
  },

  referenceSolutions: {
    JAVASCRIPT: `function sumArray(nums) {
  return nums.reduce((a, b) => a + b, 0);
}

// Input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(" ").map(Number);
  const result = sumArray(nums);
  console.log(result);
  rl.close();
});`,

    PYTHON: `def sum_array(nums):
    return sum(nums)

# Input handling
import sys
nums = list(map(int, sys.stdin.readline().split()))
result = sum_array(nums)
print(result)`,

    JAVA: `import java.util.*;

class Main {
  public static int sumArray(int[] nums) {
    int sum = 0;
    for (int n : nums) sum += n;
    return sum;
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String[] input = sc.nextLine().split(" ");
    int[] nums = Arrays.stream(input).mapToInt(Integer::parseInt).toArray();

    int result = sumArray(nums);
    System.out.println(result);
  }
}`
  }
};

export const maxElementProblem = {
  title: "Find Maximum Element",
  description:
    "Given an array of integers, return the maximum element.",
  difficulty: "EASY",
  tags: ["Array"],
  constraints: "1 <= n <= 10^5",
  hints: "Keep track of max while iterating.",
  editorial: "Linear scan for max.",
  testCases: [
    { input: "1 3 5 7 9", output: "9" },
    { input: "-1 -5 -2", output: "-1" }
  ],
  examples: {
    JAVASCRIPT: {
      input: "nums = [1,3,5,7,9]",
      output: "9"
    },
    PYTHON: {
      input: "nums = [1,3,5,7,9]",
      output: "9"
    },
    JAVA: {
      input: "nums = [1,3,5,7,9]",
      output: "9"
    }
  },

  codeSnippets: {
    JAVASCRIPT: `function findMax(nums) {
  // Write your code here
}

// Input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(" ").map(Number);
  const result = findMax(nums);
  console.log(result);
  rl.close();
});`,

    PYTHON: `def find_max(nums):
    # Write your code here
    pass

# Input handling
import sys
nums = list(map(int, sys.stdin.readline().split()))
result = find_max(nums)
print(result)`,

    JAVA: `import java.util.*;

class Main {
  public static int findMax(int[] nums) {
    // Write your code here
    return 0;
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String[] input = sc.nextLine().split(" ");
    int[] nums = Arrays.stream(input).mapToInt(Integer::parseInt).toArray();

    int result = findMax(nums);
    System.out.println(result);
  }
}`
  },

  referenceSolutions: {
    JAVASCRIPT: `function findMax(nums) {
  return Math.max(...nums);
}

// Input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(" ").map(Number);
  const result = findMax(nums);
  console.log(result);
  rl.close();
});`,

    PYTHON: `def find_max(nums):
    return max(nums)

# Input handling
import sys
nums = list(map(int, sys.stdin.readline().split()))
result = find_max(nums)
print(result)`,

    JAVA: `import java.util.*;

class Main {
  public static int findMax(int[] nums) {
    int max = nums[0];
    for (int n : nums) {
      if (n > max) max = n;
    }
    return max;
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String[] input = sc.nextLine().split(" ");
    int[] nums = Arrays.stream(input).mapToInt(Integer::parseInt).toArray();

    int result = findMax(nums);
    System.out.println(result);
  }
}`
  }
};

export const twoSumProblem = {
  title: "Two Sum",
  description:
    "Given an array of integers and a target value, return the indices of the two numbers such that they add up to the target. You may assume exactly one solution exists.",
  difficulty: "EASY",
  tags: ["Array", "Hash Table"],
  constraints:
    "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
  hints: "Use a hashmap to store visited elements.",
  editorial:
    "Traverse the array and store elements in a hashmap. For each element, check if target - current exists.",

  testCases: [
    { input: "2 7 11 15\n9", output: "0 1" },
    { input: "3 2 4\n6", output: "1 2" },
    { input: "3 3\n6", output: "0 1" }
  ],

  examples: {
    JAVASCRIPT: {
      input: "nums = [2,7,11,15], target = 9",
      output: "0 1",
      explanation: "nums[0] + nums[1] = 2 + 7 = 9"
    },
    PYTHON: {
      input: "nums = [2,7,11,15], target = 9",
      output: "0 1",
      explanation: "nums[0] + nums[1] = 2 + 7 = 9"
    },
    JAVA: {
      input: "nums = [2,7,11,15], target = 9",
      output: "0 1",
      explanation: "nums[0] + nums[1] = 2 + 7 = 9"
    }
  },

  codeSnippets: {
    JAVASCRIPT: `function twoSum(nums, target) {
  // Write your code here
}

// Input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let inputLines = [];

rl.on('line', (line) => {
  inputLines.push(line);
});

rl.on('close', () => {
  const nums = inputLines[0].trim().split(" ").map(Number);
  const target = Number(inputLines[1]);

  const result = twoSum(nums, target);
  console.log(result.join(" "));
});`,

    PYTHON: `def two_sum(nums, target):
    # Write your code here
    pass

# Input handling
import sys

lines = sys.stdin.read().splitlines()
nums = list(map(int, lines[0].split()))
target = int(lines[1])

result = two_sum(nums, target)
print(result[0], result[1])`,

    JAVA: `import java.util.*;

class Main {
  public static int[] twoSum(int[] nums, int target) {
    // Write your code here
    return new int[]{};
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String[] arr = sc.nextLine().split(" ");
    int[] nums = Arrays.stream(arr).mapToInt(Integer::parseInt).toArray();

    int target = Integer.parseInt(sc.nextLine());

    int[] result = twoSum(nums, target);
    System.out.println(result[0] + " " + result[1]);
  }
}`
  },

  referenceSolutions: {
    JAVASCRIPT: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];

    if (map.has(diff)) {
      return [map.get(diff), i];
    }

    map.set(nums[i], i);
  }
}

// Input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let inputLines = [];

rl.on('line', (line) => {
  inputLines.push(line);
});

rl.on('close', () => {
  const nums = inputLines[0].trim().split(" ").map(Number);
  const target = Number(inputLines[1]);

  const result = twoSum(nums, target);
  console.log(result.join(" "));
});`,

    PYTHON: `def two_sum(nums, target):
    d = {}
    for i, num in enumerate(nums):
        if target - num in d:
            return [d[target - num], i]
        d[num] = i

# Input handling
import sys

lines = sys.stdin.read().splitlines()
nums = list(map(int, lines[0].split()))
target = int(lines[1])

result = two_sum(nums, target)
print(result[0], result[1])`,

    JAVA: `import java.util.*;

class Main {
  public static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
      int diff = target - nums[i];

      if (map.containsKey(diff)) {
        return new int[]{map.get(diff), i};
      }

      map.put(nums[i], i);
    }

    return new int[]{};
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String[] arr = sc.nextLine().split(" ");
    int[] nums = Arrays.stream(arr).mapToInt(Integer::parseInt).toArray();

    int target = Integer.parseInt(sc.nextLine());

    int[] result = twoSum(nums, target);
    System.out.println(result[0] + " " + result[1]);
  }
}`
  }
};

const removeDuplicatesProblem = {
  title: "Remove Duplicates from Sorted Array",
  description:
    "Given a sorted array nums, remove the duplicates in-place such that each element appears only once and return the new length. The relative order of the elements should be kept the same.\n\nSince it is not possible to change the length of the array in some languages, you must instead place the unique elements in the first part of the array nums. Return the number of unique elements k.\n\nPrint the first k elements of the array after removing duplicates.",

  difficulty: "EASY",

  tags: ["Array", "Two Pointers"],

  constraints:
    "1 <= nums.length <= 10^5\n-100 <= nums[i] <= 100\nnums is sorted in non-decreasing order.",

  hints:
    "Use two pointers. One pointer keeps track of unique elements, and the other iterates through the array.",

  editorial:
    "We use a two-pointer approach. One pointer (i) tracks the position of the last unique element, and another pointer (j) scans the array. When nums[j] is different from nums[i], we increment i and update nums[i] with nums[j].",

  testCases: [
    {
      input: "1 1 2",
      output: "1 2",
    },
    {
      input: "0 0 1 1 1 2 2 3 3 4",
      output: "0 1 2 3 4",
    },
    {
      input: "5 5 5 5",
      output: "5",
    },
  ],

  examples: {
    JAVASCRIPT: {
      input: "nums = [1,1,2]",
      output: "1 2",
      explanation:
        "After removing duplicates, the array becomes [1,2]. Return first k elements.",
    },
    PYTHON: {
      input: "nums = [0,0,1,1,2]",
      output: "0 1 2",
      explanation:
        "Unique elements are [0,1,2].",
    },
    JAVA: {
      input: "nums = [5,5,5]",
      output: "5",
      explanation:
        "Only one unique element exists.",
    },
  },

  codeSnippets: {
    JAVASCRIPT: `function removeDuplicates(nums) {
  // Write your code here
}

// Input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let inputData = [];

rl.on('line', (line) => {
  inputData.push(line.trim());
});

rl.on('close', () => {
  const nums = inputData[0].split(" ").map(Number);

  const k = removeDuplicates(nums);

  const result = nums.slice(0, k);
  console.log(result.join(" "));
});`,

    PYTHON: `class Solution:
    def removeDuplicates(self, nums):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys

    nums = list(map(int, sys.stdin.readline().strip().split()))

    sol = Solution()
    k = sol.removeDuplicates(nums)

    result = nums[:k]
    print(" ".join(map(str, result)))`,

    JAVA: `import java.util.*;

class Main {
    public int removeDuplicates(int[] nums) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String[] input = sc.nextLine().split(" ");
        int[] nums = new int[input.length];

        for (int i = 0; i < input.length; i++) {
            nums[i] = Integer.parseInt(input[i]);
        }

        Main obj = new Main();
        int k = obj.removeDuplicates(nums);

        for (int i = 0; i < k; i++) {
            System.out.print(nums[i]);
            if (i != k - 1) System.out.print(" ");
        }

        sc.close();
    }
}`,
  },

  referenceSolutions: {
    JAVASCRIPT: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let i = 0;

  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }

  return i + 1;
}

// Input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let inputData = [];

rl.on('line', (line) => {
  inputData.push(line.trim());
});

rl.on('close', () => {
  const nums = inputData[0].split(" ").map(Number);

  const k = removeDuplicates(nums);

  const result = nums.slice(0, k);
  console.log(result.join(" "));
});`,

    PYTHON: `class Solution:
    def removeDuplicates(self, nums):
        if len(nums) == 0:
            return 0

        i = 0

        for j in range(1, len(nums)):
            if nums[j] != nums[i]:
                i += 1
                nums[i] = nums[j]

        return i + 1

if __name__ == "__main__":
    import sys

    nums = list(map(int, sys.stdin.readline().strip().split()))

    sol = Solution()
    k = sol.removeDuplicates(nums)

    result = nums[:k]
    print(" ".join(map(str, result)))`,

    JAVA: `import java.util.*;

class Main {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int i = 0;

        for (int j = 1; j < nums.length; j++) {
            if (nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }

        return i + 1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String[] input = sc.nextLine().split(" ");
        int[] nums = new int[input.length];

        for (int i = 0; i < input.length; i++) {
            nums[i] = Integer.parseInt(input[i]);
        }

        Main obj = new Main();
        int k = obj.removeDuplicates(nums);

        for (int i = 0; i < k; i++) {
            System.out.print(nums[i]);
            if (i != k - 1) System.out.print(" ");
        }

        sc.close();
    }
}`,
  },
};