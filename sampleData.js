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

const longestSubstringWithoutRepeating = {
  title: "Longest Substring Without Repeating Characters",

  description:
    "Given a string s, find the length of the longest substring without repeating characters.\n\nA substring is a contiguous sequence of characters within a string.",

  difficulty: "MEDIUM",

  tags: ["String", "Sliding Window", "HashMap"],

  constraints:
    "0 <= s.length <= 10^5\ns consists of English letters, digits, symbols and spaces.",

  hints:
    "Use a sliding window with a set or hashmap to track characters. Expand the window and shrink it when duplicates appear.",

  editorial:
    "We use a sliding window with two pointers (left and right). We expand the window by moving right. If a duplicate character is found, we shrink the window from the left until the duplicate is removed. Track the maximum window size during the process.",

  testCases: [
    {
      input: "abcabcbb",
      output: "3",
    },
    {
      input: "bbbbb",
      output: "1",
    },
    {
      input: "pwwkew",
      output: "3",
    },
  ],

  examples: {
    JAVASCRIPT: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation:
        "The answer is 'abc', with length 3.",
    },
    PYTHON: {
      input: 's = "bbbbb"',
      output: "1",
      explanation:
        "The answer is 'b', with length 1.",
    },
    JAVA: {
      input: 's = "pwwkew"',
      output: "3",
      explanation:
        "The answer is 'wke', with length 3.",
    },
  },

  codeSnippets: {
    JAVASCRIPT: `function lengthOfLongestSubstring(s) {
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
  const s = inputData[0];

  const result = lengthOfLongestSubstring(s);
  console.log(result);
});`,

    PYTHON: `class Solution:
    def lengthOfLongestSubstring(self, s):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys

    s = sys.stdin.readline().strip()

    sol = Solution()
    result = sol.lengthOfLongestSubstring(s)

    print(result)`,

    JAVA: `import java.util.*;

class Main {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        Main obj = new Main();
        int result = obj.lengthOfLongestSubstring(s);

        System.out.println(result);

        sc.close();
    }
}`,
  },

  referenceSolutions: {
    JAVASCRIPT: `function lengthOfLongestSubstring(s) {
  let set = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }

    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
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
  const s = inputData[0];

  const result = lengthOfLongestSubstring(s);
  console.log(result);
});`,

    PYTHON: `class Solution:
    def lengthOfLongestSubstring(self, s):
        char_set = set()
        left = 0
        max_length = 0

        for right in range(len(s)):
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1

            char_set.add(s[right])
            max_length = max(max_length, right - left + 1)

        return max_length

if __name__ == "__main__":
    import sys

    s = sys.stdin.readline().strip()

    sol = Solution()
    result = sol.lengthOfLongestSubstring(s)

    print(result)`,

    JAVA: `import java.util.*;

class Main {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int left = 0;
        int maxLength = 0;

        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left));
                left++;
            }

            set.add(s.charAt(right));
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        Main obj = new Main();
        int result = obj.lengthOfLongestSubstring(s);

        System.out.println(result);

        sc.close();
    }
}`,
  },
};

const subarraySumEqualsK = {
  title: "Subarray Sum Equals K",

  description:
    "Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.",

  difficulty: "MEDIUM",

  tags: ["Array", "Prefix Sum", "HashMap"],

  constraints:
    "1 <= nums.length <= 2 * 10^4\n-1000 <= nums[i] <= 1000\n-10^7 <= k <= 10^7",

  hints:
    "Use prefix sum and a hashmap to store frequencies of sums.",

  editorial:
    "We use a running sum and store how many times a particular prefix sum has occurred. If (currentSum - k) exists in the map, it means a subarray with sum k exists.",

  testCases: [
    {
      input: "1 1 1\n2",
      output: "2",
    },
    {
      input: "1 2 3\n3",
      output: "2",
    },
    {
      input: "-1 -1 1\n0",
      output: "1",
    },
  ],

  examples: {
    JAVASCRIPT: {
      input: "nums = [1,1,1], k = 2",
      output: "2",
      explanation:
        "Subarrays are [1,1] and [1,1].",
    },
    PYTHON: {
      input: "nums = [1,2,3], k = 3",
      output: "2",
      explanation:
        "Subarrays are [1,2] and [3].",
    },
    JAVA: {
      input: "nums = [-1,-1,1], k = 0",
      output: "1",
      explanation:
        "Subarray is [-1,-1,1].",
    },
  },

  codeSnippets: {
    JAVASCRIPT: `function subarraySum(nums, k) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let inputData = [];
rl.on('line', (line) => inputData.push(line.trim()));

rl.on('close', () => {
  const nums = inputData[0].split(" ").map(Number);
  const k = parseInt(inputData[1]);

  const result = subarraySum(nums, k);
  console.log(result);
});`,

    PYTHON: `class Solution:
    def subarraySum(self, nums, k):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()

    nums = list(map(int, lines[0].split()))
    k = int(lines[1])

    sol = Solution()
    print(sol.subarraySum(nums, k))`,

    JAVA: `import java.util.*;

class Main {
    public int subarraySum(int[] nums, int k) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String[] arr = sc.nextLine().split(" ");
        int[] nums = new int[arr.length];
        for (int i = 0; i < arr.length; i++) nums[i] = Integer.parseInt(arr[i]);

        int k = Integer.parseInt(sc.nextLine());

        Main obj = new Main();
        System.out.println(obj.subarraySum(nums, k));

        sc.close();
    }
}`,
  },

  referenceSolutions: {
    JAVASCRIPT: `function subarraySum(nums, k) {
  let map = new Map();
  map.set(0, 1);

  let sum = 0;
  let count = 0;

  for (let num of nums) {
    sum += num;

    if (map.has(sum - k)) {
      count += map.get(sum - k);
    }

    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return count;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let inputData = [];
rl.on('line', (line) => inputData.push(line.trim()));

rl.on('close', () => {
  const nums = inputData[0].split(" ").map(Number);
  const k = parseInt(inputData[1]);

  const result = subarraySum(nums, k);
  console.log(result);
});`,

    PYTHON: `class Solution:
    def subarraySum(self, nums, k):
        prefix = {0:1}
        curr = 0
        count = 0

        for num in nums:
            curr += num
            if curr - k in prefix:
                count += prefix[curr - k]
            prefix[curr] = prefix.get(curr, 0) + 1

        return count

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()

    nums = list(map(int, lines[0].split()))
    k = int(lines[1])

    sol = Solution()
    print(sol.subarraySum(nums, k))`,

    JAVA: `import java.util.*;

class Main {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);

        int sum = 0, count = 0;

        for (int num : nums) {
            sum += num;

            if (map.containsKey(sum - k)) {
                count += map.get(sum - k);
            }

            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }

        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String[] arr = sc.nextLine().split(" ");
        int[] nums = new int[arr.length];
        for (int i = 0; i < arr.length; i++) nums[i] = Integer.parseInt(arr[i]);

        int k = Integer.parseInt(sc.nextLine());

        Main obj = new Main();
        System.out.println(obj.subarraySum(nums, k));

        sc.close();
    }
}`,
  },
};

const containerWithMostWater = {
  title: "Container With Most Water",

  description:
    "Given an integer array height, find two lines that together with the x-axis form a container, such that the container contains the most water.",

  difficulty: "MEDIUM",

  tags: ["Array", "Two Pointers"],

  constraints:
    "2 <= height.length <= 10^5\n0 <= height[i] <= 10^4",

  hints:
    "Use two pointers from both ends and move the smaller height inward.",

  editorial:
    "We use two pointers. The area is determined by the shorter line. Move the pointer pointing to the smaller height to maximize area.",

  testCases: [
    {
      input: "1 8 6 2 5 4 8 3 7",
      output: "49",
    },
    {
      input: "1 1",
      output: "1",
    },
  ],

  examples: {
    JAVASCRIPT: {
      input: "height = [1,8,6,2,5,4,8,3,7]",
      output: "49",
      explanation:
        "Max area between heights 8 and 7.",
    },
    PYTHON: {
      input: "height = [1,1]",
      output: "1",
      explanation:
        "Only one possible container.",
    },
    JAVA: {
      input: "height = [1,8,6,2,5]",
      output: "8",
      explanation:
        "Max area is 8.",
    },
  },

  codeSnippets: {
    JAVASCRIPT: `function maxArea(height) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let inputData = [];
rl.on('line', (line) => inputData.push(line.trim()));

rl.on('close', () => {
  const height = inputData[0].split(" ").map(Number);

  const result = maxArea(height);
  console.log(result);
});`,

    PYTHON: `class Solution:
    def maxArea(self, height):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    height = list(map(int, sys.stdin.readline().split()))

    sol = Solution()
    print(sol.maxArea(height))`,

    JAVA: `import java.util.*;

class Main {
    public int maxArea(int[] height) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String[] arr = sc.nextLine().split(" ");
        int[] height = new int[arr.length];
        for (int i = 0; i < arr.length; i++) height[i] = Integer.parseInt(arr[i]);

        Main obj = new Main();
        System.out.println(obj.maxArea(height));

        sc.close();
    }
}`,
  },

  referenceSolutions: {
    JAVASCRIPT: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;

  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);

    if (height[left] < height[right]) left++;
    else right--;
  }

  return max;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let inputData = [];
rl.on('line', (line) => inputData.push(line.trim()));

rl.on('close', () => {
  const height = inputData[0].split(" ").map(Number);

  const result = maxArea(height);
  console.log(result);
});`,

    PYTHON: `class Solution:
    def maxArea(self, height):
        left, right = 0, len(height) - 1
        max_area = 0

        while left < right:
            area = min(height[left], height[right]) * (right - left)
            max_area = max(max_area, area)

            if height[left] < height[right]:
                left += 1
            else:
                right -= 1

        return max_area

if __name__ == "__main__":
    import sys
    height = list(map(int, sys.stdin.readline().split()))

    sol = Solution()
    print(sol.maxArea(height))`,

    JAVA: `import java.util.*;

class Main {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int max = 0;

        while (left < right) {
            int area = Math.min(height[left], height[right]) * (right - left);
            max = Math.max(max, area);

            if (height[left] < height[right]) left++;
            else right--;
        }

        return max;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String[] arr = sc.nextLine().split(" ");
        int[] height = new int[arr.length];
        for (int i = 0; i < arr.length; i++) height[i] = Integer.parseInt(arr[i]);

        Main obj = new Main();
        System.out.println(obj.maxArea(height));

        sc.close();
    }
}`,
  },
};