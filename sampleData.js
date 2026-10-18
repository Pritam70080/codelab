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

const additionalProblems = [
  {
    title: "Valid Parentheses",
    description: "Given a string s containing only '(', ')', '{', '}', '[' and ']', determine whether the input string is valid. Brackets must close in the correct order.",
    difficulty: "EASY",
    tags: ["String", "Stack"],
    constraints: "1 <= s.length <= 10^4\ns consists of parentheses characters only.",
    hints: "Use a stack to remember opening brackets. Every closing bracket must match the most recent opening bracket.",
    editorial: "Push opening brackets onto a stack. For each closing bracket, check that the stack is non-empty and its top is the matching opener. The string is valid only if no mismatch occurs and the stack is empty at the end.",
    testCases: [
      { input: "()", output: "true" },
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" }
    ],
    examples: {
      JAVASCRIPT: {
        input: 's = "()"',
        output: "true",
        explanation: "The opening parenthesis is closed in the correct order."
      },
      PYTHON: {
        input: 's = "(]"',
        output: "false",
        explanation: "The closing bracket does not match the opening parenthesis."
      },
      JAVA: {
        input: 's = "([])"',
        output: "true",
        explanation: "Every bracket pair is correctly nested."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function isValid(s) {
  // Write your code here
}
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  console.log(isValid(line.trim()));
  rl.close();
});`,
      PYTHON: `class Solution:
    def isValid(self, s):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    print(str(Solution().isValid(sys.stdin.readline().rstrip("\n"))).lower())`,
      JAVA: `import java.util.*;

class Main {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(new Main().isValid(sc.nextLine()));
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };

  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else if (stack.pop() !== pairs[ch]) {
      return false;
    }
  }

  return stack.length === 0;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  console.log(isValid(line.trim()));
  rl.close();
});`,
      PYTHON: `class Solution:
    def isValid(self, s):
        stack = []
        pairs = {')': '(', ']': '[', '}': '{'}

        for ch in s:
            if ch in '([{':
                stack.append(ch)
            elif not stack or stack.pop() != pairs[ch]:
                return False

        return not stack

if __name__ == "__main__":
    import sys
    print(str(Solution().isValid(sys.stdin.readline().rstrip("\n"))).lower())`,
      JAVA: `import java.util.*;

class Main {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;

                char top = stack.pop();

                if ((c == ')' && top != '(') ||
                    (c == ']' && top != '[') ||
                    (c == '}' && top != '{')) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(new Main().isValid(sc.nextLine()));
    }
}`
    }
  },

  {
    title: "Best Time to Buy and Sell Stock",
    description: "Given an array prices where prices[i] is the price of a stock on day i, choose one day to buy and a later day to sell. Return the maximum profit, or 0 if no profit is possible.",
    difficulty: "EASY",
    tags: ["Array", "Dynamic Programming"],
    constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
    hints: "Track the lowest price seen so far and the best profit available at each day.",
    editorial: "Scan the array once. Maintain the minimum price so far; for each price, calculate the profit from buying at that minimum and update the maximum profit.",
    testCases: [
      { input: "7 1 5 3 6 4", output: "5" },
      { input: "7 6 4 3 1", output: "0" }
    ],
    examples: {
      JAVASCRIPT: {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy at 1 and sell later at 6."
      },
      PYTHON: {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "No later selling price exceeds an earlier buying price."
      },
      JAVA: {
        input: "prices = [2,4,1]",
        output: "2",
        explanation: "Buy at 2 and sell at 4."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function maxProfit(prices) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  console.log(maxProfit(line.trim().split(/\s+/).map(Number)));
  rl.close();
});`,
      PYTHON: `class Solution:
    def maxProfit(self, prices):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    prices = list(map(int, sys.stdin.readline().split()))
    print(Solution().maxProfit(prices))`,
      JAVA: `import java.util.*;

class Main {
    public int maxProfit(int[] prices) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] a = sc.nextLine().trim().split("\\s+");
        int[] prices = Arrays.stream(a)
            .mapToInt(Integer::parseInt)
            .toArray();

        System.out.println(new Main().maxProfit(prices));
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }

  return best;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  console.log(maxProfit(line.trim().split(/\s+/).map(Number)));
  rl.close();
});`,
      PYTHON: `class Solution:
    def maxProfit(self, prices):
        minimum = float('inf')
        best = 0

        for price in prices:
            minimum = min(minimum, price)
            best = max(best, price - minimum)

        return best

if __name__ == "__main__":
    import sys
    prices = list(map(int, sys.stdin.readline().split()))
    print(Solution().maxProfit(prices))`,
      JAVA: `import java.util.*;

class Main {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int best = 0;

        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            best = Math.max(best, price - minPrice);
        }

        return best;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] a = sc.nextLine().trim().split("\\s+");
        int[] prices = Arrays.stream(a)
            .mapToInt(Integer::parseInt)
            .toArray();

        System.out.println(new Main().maxProfit(prices));
    }
}`
    }
  },

  {
    title: "Binary Search",
    description: "Given a sorted array of distinct integers nums and an integer target, return the index of target. If target is not present, return -1.",
    difficulty: "EASY",
    tags: ["Array", "Binary Search"],
    constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i], target <= 10^9\nnums is sorted in strictly increasing order.",
    hints: "Compare the target with the middle element and discard half of the remaining search range each step.",
    editorial: "Use two boundaries, left and right. While left <= right, inspect the middle element. Return its index on a match; otherwise move the corresponding boundary inward. Return -1 if the range becomes empty.",
    testCases: [
      { input: "-1 0 3 5 9 12\n9", output: "4" },
      { input: "-1 0 3 5 9 12\n2", output: "-1" }
    ],
    examples: {
      JAVASCRIPT: {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "The target 9 is at index 4."
      },
      PYTHON: {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "The target is not in the array."
      },
      JAVA: {
        input: "nums = [1,3,5,7], target = 5",
        output: "2",
        explanation: "The target 5 is at index 2."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function search(nums, target) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let lines = [];

rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  console.log(
    search(
      lines[0].split(/\s+/).map(Number),
      Number(lines[1])
    )
  );
});`,
      PYTHON: `class Solution:
    def search(self, nums, target):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    target = int(sys.stdin.readline())
    print(Solution().search(nums, target))`,
      JAVA: `import java.util.*;

class Main {
    public int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(
            sc.nextLine().trim().split("\\s+")
        ).mapToInt(Integer::parseInt).toArray();

        int target = Integer.parseInt(sc.nextLine().trim());
        System.out.println(new Main().search(nums, target));
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) return mid;

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let lines = [];

rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  console.log(
    search(
      lines[0].split(/\s+/).map(Number),
      Number(lines[1])
    )
  );
});`,
      PYTHON: `class Solution:
    def search(self, nums, target):
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = left + (right - left) // 2

            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return -1

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    target = int(sys.stdin.readline())
    print(Solution().search(nums, target))`,
      JAVA: `import java.util.*;

class Main {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) return mid;

            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(
            sc.nextLine().trim().split("\\s+")
        ).mapToInt(Integer::parseInt).toArray();

        int target = Integer.parseInt(sc.nextLine().trim());
        System.out.println(new Main().search(nums, target));
    }
}`
    }
  },
  {
    title: "Product of Array Except Self",
    description: "Given an integer array nums, return an array answer such that answer[i] equals the product of all elements of nums except nums[i]. Solve the problem without using division and in O(n) time.",
    difficulty: "MEDIUM",
    tags: ["Array", "Prefix Sum"],
    constraints: "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
    hints: "Calculate products to the left of each index, then multiply them by the corresponding products to the right.",
    editorial: "Create an answer array initialized with 1. Traverse from left to right, storing the product of elements before each index. Then traverse from right to left, multiplying each answer entry by the product of elements after that index. This avoids division and takes O(n) time.",
    testCases: [
      { input: "1 2 3 4", output: "24 12 8 6" },
      { input: "-1 1 0 -3 3", output: "0 0 9 0 0" },
      { input: "2 3", output: "3 2" }
    ],
    examples: {
      JAVASCRIPT: {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation: "Each result is the product of every array element except the element at that index."
      },
      PYTHON: {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]",
        explanation: "The zero causes every product except the product at its own index to become zero."
      },
      JAVA: {
        input: "nums = [2,3]",
        output: "[3,2]",
        explanation: "For each index, the result is the other element."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function productExceptSelf(nums) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  console.log(productExceptSelf(line.trim().split(/\s+/).map(Number)).join(' '));
  rl.close();
});`,
      PYTHON: `class Solution:
    def productExceptSelf(self, nums):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    print(*Solution().productExceptSelf(nums))`,
      JAVA: `import java.util.*;

class Main {
    public int[] productExceptSelf(int[] nums) {
        // Write your code here
        return new int[nums.length];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .mapToInt(Integer::parseInt).toArray();
        int[] result = new Main().productExceptSelf(nums);
        String output = Arrays.stream(result)
            .mapToObj(String::valueOf)
            .collect(java.util.stream.Collectors.joining(" "));
        System.out.println(output);
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function productExceptSelf(nums) {
  const answer = new Array(nums.length).fill(1);
  let prefix = 1;

  for (let i = 0; i < nums.length; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }

  return answer;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  console.log(productExceptSelf(line.trim().split(/\s+/).map(Number)).join(' '));
  rl.close();
});`,
      PYTHON: `class Solution:
    def productExceptSelf(self, nums):
        answer = [1] * len(nums)
        prefix = 1

        for i in range(len(nums)):
            answer[i] = prefix
            prefix *= nums[i]

        suffix = 1

        for i in range(len(nums) - 1, -1, -1):
            answer[i] *= suffix
            suffix *= nums[i]

        return answer

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    print(*Solution().productExceptSelf(nums))`,
      JAVA: `import java.util.*;

class Main {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        Arrays.fill(answer, 1);

        int prefix = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = prefix;
            prefix *= nums[i];
        }

        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= suffix;
            suffix *= nums[i];
        }

        return answer;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .mapToInt(Integer::parseInt).toArray();
        int[] result = new Main().productExceptSelf(nums);
        String output = Arrays.stream(result)
            .mapToObj(String::valueOf)
            .collect(java.util.stream.Collectors.joining(" "));
        System.out.println(output);
    }
}`
    }
  },

  {
    title: "3Sum",
    description: "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and nums[i] + nums[j] + nums[k] == 0. The solution must not contain duplicate triplets.",
    difficulty: "MEDIUM",
    tags: ["Array", "Two Pointers", "Sorting"],
    constraints: "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
    hints: "Sort the array, fix one element, and use two pointers to find pairs that complete the sum to zero. Skip duplicates.",
    editorial: "Sort the array. For each index i, use left and right pointers to search for a pair whose sum equals -nums[i]. Move pointers based on the sum and skip repeated values to avoid duplicate triplets. The time complexity is O(n^2).",
    testCases: [
      { input: "-1 0 1 2 -1 -4", output: "-1 -1 2; -1 0 1" },
      { input: "0 1 1", output: "" },
      { input: "0 0 0", output: "0 0 0" }
    ],
    examples: {
      JAVASCRIPT: {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "Both triplets sum to zero, and duplicate triplets are omitted."
      },
      PYTHON: {
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "No three elements sum to zero."
      },
      JAVA: {
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]",
        explanation: "The only unique triplet is [0,0,0]."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function threeSum(nums) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  console.log(JSON.stringify(threeSum(line.trim().split(/\s+/).filter(Boolean).map(Number))));
  rl.close();
});`,
      PYTHON: `class Solution:
    def threeSum(self, nums):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    print(Solution().threeSum(nums))`,
      JAVA: `import java.util.*;

class Main {
    public List<List<Integer>> threeSum(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .mapToInt(Integer::parseInt).toArray();
        System.out.println(new Main().threeSum(nums));
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  console.log(JSON.stringify(threeSum(line.trim().split(/\s+/).filter(Boolean).map(Number))));
  rl.close();
});`,
      PYTHON: `class Solution:
    def threeSum(self, nums):
        nums.sort()
        result = []

        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            left, right = i + 1, len(nums) - 1

            while left < right:
                total = nums[i] + nums[left] + nums[right]

                if total == 0:
                    result.append([nums[i], nums[left], nums[right]])
                    left += 1
                    right -= 1

                    while left < right and nums[left] == nums[left - 1]:
                        left += 1
                    while left < right and nums[right] == nums[right + 1]:
                        right -= 1
                elif total < 0:
                    left += 1
                else:
                    right -= 1

        return result

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    print(Solution().threeSum(nums))`,
      JAVA: `import java.util.*;

class Main {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                long sum = (long) nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    left++;
                    right--;

                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .mapToInt(Integer::parseInt).toArray();
        System.out.println(new Main().threeSum(nums));
    }
}`
    }
  },

  {
    title: "Merge Intervals",
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the input intervals.",
    difficulty: "MEDIUM",
    tags: ["Array", "Sorting"],
    constraints: "1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti <= endi <= 10^4",
    hints: "Sort intervals by their starting points. Compare each interval with the last merged interval.",
    editorial: "Sort intervals by their start values. Add the first interval to the result. For every subsequent interval, merge it with the last result interval if they overlap; otherwise, append it as a new interval. The time complexity is O(n log n).",
    testCases: [
      { input: "1 3; 2 6; 8 10; 15 18", output: "1 6; 8 10; 15 18" },
      { input: "1 4; 4 5", output: "1 5" },
      { input: "1 4", output: "1 4" }
    ],
    examples: {
      JAVASCRIPT: {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "The intervals [1,3] and [2,6] overlap and are merged into [1,6]."
      },
      PYTHON: {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals sharing an endpoint are merged."
      },
      JAVA: {
        input: "intervals = [[1,4]]",
        output: "[[1,4]]",
        explanation: "A single interval remains unchanged."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function merge(intervals) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  const intervals = line.split(';').map(part => part.trim().split(/\s+/).map(Number));
  console.log(JSON.stringify(merge(intervals)));
  rl.close();
});`,
      PYTHON: `class Solution:
    def merge(self, intervals):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    intervals = [
        list(map(int, part.strip().split()))
        for part in sys.stdin.readline().split(";")
    ]
    print(Solution().merge(intervals))`,
      JAVA: `import java.util.*;

class Main {
    public int[][] merge(int[][] intervals) {
        // Write your code here
        return new int[0][0];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(";");
        int[][] intervals = new int[parts.length][2];

        for (int i = 0; i < parts.length; i++) {
            String[] values = parts[i].trim().split("\\s+");
            intervals[i][0] = Integer.parseInt(values[0]);
            intervals[i][1] = Integer.parseInt(values[1]);
        }

        System.out.println(Arrays.deepToString(new Main().merge(intervals)));
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];

  for (const interval of intervals) {
    if (result.length === 0 || result[result.length - 1][1] < interval[0]) {
      result.push([...interval]);
    } else {
      result[result.length - 1][1] = Math.max(
        result[result.length - 1][1],
        interval[1]
      );
    }
  }

  return result;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  const intervals = line.split(';').map(part => part.trim().split(/\\s+/).map(Number));
  console.log(JSON.stringify(merge(intervals)));
  rl.close();
});`,
      PYTHON: `class Solution:
    def merge(self, intervals):
        intervals.sort(key=lambda interval: interval[0])
        result = []

        for start, end in intervals:
            if not result or result[-1][1] < start:
                result.append([start, end])
            else:
                result[-1][1] = max(result[-1][1], end)

        return result

if __name__ == "__main__":
    import sys
    intervals = [
        list(map(int, part.strip().split()))
        for part in sys.stdin.readline().split(";")
    ]
    print(Solution().merge(intervals))`,
      JAVA: `import java.util.*;

class Main {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> result = new ArrayList<>();

        for (int[] interval : intervals) {
            if (result.isEmpty() ||
                result.get(result.size() - 1)[1] < interval[0]) {
                result.add(interval.clone());
            } else {
                int[] last = result.get(result.size() - 1);
                last[1] = Math.max(last[1], interval[1]);
            }
        }

        return result.toArray(new int[result.size()][]);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(";");
        int[][] intervals = new int[parts.length][2];

        for (int i = 0; i < parts.length; i++) {
            String[] values = parts[i].trim().split("\\s+");
            intervals[i][0] = Integer.parseInt(values[0]);
            intervals[i][1] = Integer.parseInt(values[1]);
        }

        System.out.println(Arrays.deepToString(new Main().merge(intervals)));
    }
}`
    }
  },

  {
    title: "Number of Islands",
    description: "Given an m x n grid of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    difficulty: "MEDIUM",
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Matrix"],
    constraints: "1 <= m, n <= 300\ngrid[i][j] is either '0' or '1'.\nAdjacency is horizontal or vertical only.",
    hints: "Scan every cell. When you find unvisited land, increment the island count and explore all connected land cells.",
    editorial: "Traverse the grid. Whenever an unvisited land cell is found, increment the island count and run DFS to mark all horizontally and vertically connected land as visited. Each cell is visited at most once, giving O(m*n) time complexity.",
    testCases: [
      { input: "11000; 11000; 00100; 00011", output: "3" },
      { input: "11110; 11010; 11000; 00000", output: "1" },
      { input: "0", output: "0" }
    ],
    examples: {
      JAVASCRIPT: {
        input: 'grid = [["1","1","0"],["0","1","0"],["1","0","1"]]',
        output: "3",
        explanation: "There are three disconnected groups of land."
      },
      PYTHON: {
        input: 'grid = [["1","1"],["1","1"]]',
        output: "1",
        explanation: "All land cells are connected."
      },
      JAVA: {
        input: 'grid = [["0","0"],["0","0"]]',
        output: "0",
        explanation: "The grid contains no land."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function numIslands(grid) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  const grid = line.split(';').map(row => row.trim().split(''));
  console.log(numIslands(grid));
  rl.close();
});`,
      PYTHON: `class Solution:
    def numIslands(self, grid):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    grid = [list(row.strip()) for row in sys.stdin.readline().split(";")]
    print(Solution().numIslands(grid))`,
      JAVA: `import java.util.*;

class Main {
    public int numIslands(char[][] grid) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] rows = sc.nextLine().split(";");
        char[][] grid = new char[rows.length][];

        for (int i = 0; i < rows.length; i++) {
            grid[i] = rows[i].trim().toCharArray();
        }

        System.out.println(new Main().numIslands(grid));
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function numIslands(grid) {
  if (grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (
      r < 0 || c < 0 || r >= rows || c >= cols ||
      grid[r][c] !== '1'
    ) return;

    grid[r][c] = '0';

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  const grid = line.split(';').map(row => row.trim().split(''));
  console.log(numIslands(grid));
  rl.close();
});`,
      PYTHON: `class Solution:
    def numIslands(self, grid):
        if not grid:
            return 0

        rows, cols = len(grid), len(grid[0])
        count = 0

        def dfs(r, c):
            if (
                r < 0 or c < 0 or r >= rows or c >= cols
                or grid[r][c] != '1'
            ):
                return

            grid[r][c] = '0'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)

        return count

if __name__ == "__main__":
    import sys
    grid = [list(row.strip()) for row in sys.stdin.readline().split(";")]
    print(Solution().numIslands(grid))`,
      JAVA: `import java.util.*;

class Main {
    public int numIslands(char[][] grid) {
        if (grid.length == 0) return 0;

        int rows = grid.length;
        int cols = grid[0].length;
        int count = 0;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }

        return count;
    }

    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length ||
            c >= grid[0].length || grid[r][c] != '1') {
            return;
        }

        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] rows = sc.nextLine().split(";");
        char[][] grid = new char[rows.length][];

        for (int i = 0; i < rows.length; i++) {
            grid[i] = rows[i].trim().toCharArray();
        }

        System.out.println(new Main().numIslands(grid));
    }
}`
    }
  },
  {
    title: "Two Sum II - Input Array Is Sorted",
    description: "Given a 1-indexed array of integers numbers sorted in non-decreasing order and an integer target, return the indices of two numbers whose sum equals target. Return the indices as a 1-indexed pair. Exactly one solution exists, and the same element cannot be used twice.",
    difficulty: "MEDIUM",
    tags: ["Array", "Two Pointers", "Binary Search"],
    constraints: "2 <= numbers.length <= 3 * 10^4\n-1000 <= numbers[i] <= 1000\nnumbers is sorted in non-decreasing order.\n-1000 <= target <= 1000\nExactly one solution exists.",
    hints: "Start one pointer at each end. If the sum is too small, move the left pointer right; if it is too large, move the right pointer left.",
    editorial: "Because the array is sorted, use left and right pointers. Compare their sum with target. Move left forward when the sum is too small and right backward when the sum is too large. Return the 1-indexed positions when the sum matches. Time complexity O(n), space complexity O(1).",
    testCases: [
      { input: "2 7 11 15\n9", output: "1 2" },
      { input: "2 3 4\n6", output: "1 3" },
      { input: "-1 0\n-1", output: "1 2" }
    ],
    examples: {
      JAVASCRIPT: {
        input: "numbers = [2,7,11,15], target = 9",
        output: "[1,2]",
        explanation: "The values 2 and 7 sum to 9."
      },
      PYTHON: {
        input: "numbers = [2,3,4], target = 6",
        output: "[1,3]",
        explanation: "The values 2 and 4 sum to 6."
      },
      JAVA: {
        input: "numbers = [-1,0], target = -1",
        output: "[1,2]",
        explanation: "The values -1 and 0 sum to -1."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function twoSum(numbers, target) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const lines = [];
rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  const numbers = lines[0].split(/\s+/).map(Number);
  const target = Number(lines[1]);
  console.log(twoSum(numbers, target).join(' '));
});`,
      PYTHON: `class Solution:
    def twoSum(self, numbers, target):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    numbers = list(map(int, sys.stdin.readline().split()))
    target = int(sys.stdin.readline())
    print(*Solution().twoSum(numbers, target))`,
      JAVA: `import java.util.*;

class Main {
    public int[] twoSum(int[] numbers, int target) {
        // Write your code here
        return new int[0];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] numbers = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .mapToInt(Integer::parseInt).toArray();
        int target = Integer.parseInt(sc.nextLine().trim());
        int[] result = new Main().twoSum(numbers, target); 
        String output = Arrays.stream(result) 
                              .mapToObj(String::valueOf) 
                              .collect(java.util.stream.Collectors.joining(" ")); 
        
        System.out.println(output); 
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }

  return [];
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const lines = [];
rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  console.log(twoSum(lines[0].split(/\s+/).map(Number), Number(lines[1])).join(' '));
});`,
      PYTHON: `class Solution:
    def twoSum(self, numbers, target):
        left, right = 0, len(numbers) - 1

        while left < right:
            total = numbers[left] + numbers[right]
            if total == target:
                return [left + 1, right + 1]
            if total < target:
                left += 1
            else:
                right -= 1

        return []

if __name__ == "__main__":
    import sys
    numbers = list(map(int, sys.stdin.readline().split()))
    target = int(sys.stdin.readline())
    print(*Solution().twoSum(numbers, target))`,
      JAVA: `import java.util.*;

class Main {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }

        return new int[0];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] numbers = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .mapToInt(Integer::parseInt).toArray();
        int target = Integer.parseInt(sc.nextLine().trim());
        int[] result = new Main().twoSum(numbers, target); 
        String output = Arrays.stream(result) 
                              .mapToObj(String::valueOf) 
                              .collect(java.util.stream.Collectors.joining(" ")); 
        
        System.out.println(output); 
    }
}`
    }
  },

  {
    title: "Remove Element",
    description: "Given an integer array nums and an integer val, remove all occurrences of val in-place. The relative order of the remaining elements may change. Return the number k of elements that are not equal to val. The first k positions must contain the remaining elements.",
    difficulty: "EASY",
    tags: ["Array", "Two Pointers"],
    constraints: "0 <= nums.length <= 100\n0 <= nums[i] <= 50\n0 <= val <= 100",
    hints: "Use a write pointer for the next position where a value different from val should be placed.",
    editorial: "Maintain a write pointer k. Iterate through nums; whenever an element differs from val, write it at nums[k] and increment k. Return k. Time complexity O(n), extra space O(1).",
    testCases: [
      { input: "3 2 2 3\n3", output: "2" },
      { input: "0 1 2 2 3 0 4 2\n2", output: "5" },
      { input: "1 1 1\n1", output: "0" }
    ],
    examples: {
      JAVASCRIPT: {
        input: "nums = [3,2,2,3], val = 3",
        output: "2",
        explanation: "The first two positions contain the remaining values 2 and 2."
      },
      PYTHON: {
        input: "nums = [0,1,2,2,3,0,4,2], val = 2",
        output: "5",
        explanation: "Five elements are different from 2."
      },
      JAVA: {
        input: "nums = [1,1,1], val = 1",
        output: "0",
        explanation: "Every element is removed, leaving zero valid elements."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function removeElement(nums, val) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const lines = [];
rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  const nums = lines[0].split(/\s+/).filter(Boolean).map(Number);
  console.log(removeElement(nums, Number(lines[1])));
});`,
      PYTHON: `class Solution:
    def removeElement(self, nums, val):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    val = int(sys.stdin.readline())
    print(Solution().removeElement(nums, val))`,
      JAVA: `import java.util.*;

class Main {
    public int removeElement(int[] nums, int val) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .filter(s -> !s.isEmpty()).mapToInt(Integer::parseInt).toArray();
        int val = Integer.parseInt(sc.nextLine().trim());
        System.out.println(new Main().removeElement(nums, val));
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function removeElement(nums, val) {
  let k = 0;

  for (const num of nums) {
    if (num !== val) nums[k++] = num;
  }

  return k;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const lines = [];
rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  const nums = lines[0].split(/\s+/).filter(Boolean).map(Number);
  console.log(removeElement(nums, Number(lines[1])));
});`,
      PYTHON: `class Solution:
    def removeElement(self, nums, val):
        k = 0

        for num in nums:
            if num != val:
                nums[k] = num
                k += 1

        return k

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    val = int(sys.stdin.readline())
    print(Solution().removeElement(nums, val))`,
      JAVA: `import java.util.*;

class Main {
    public int removeElement(int[] nums, int val) {
        int k = 0;

        for (int num : nums) {
            if (num != val) nums[k++] = num;
        }

        return k;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .filter(s -> !s.isEmpty()).mapToInt(Integer::parseInt).toArray();
        int val = Integer.parseInt(sc.nextLine().trim());
        System.out.println(new Main().removeElement(nums, val));
    }
}`
    }
  },

  {
    title: "Move Zeroes",
    description: "Given an integer array nums, move all zeroes to the end while maintaining the relative order of the non-zero elements. Perform the operation in-place.",
    difficulty: "EASY",
    tags: ["Array", "Two Pointers"],
    constraints: "1 <= nums.length <= 10^4\n-2^31 <= nums[i] <= 2^31 - 1",
    hints: "Use one pointer to scan the array and another to track where the next non-zero value belongs.",
    editorial: "Maintain a write pointer. When a non-zero value is found, swap it with the value at the write pointer and advance the pointer. This preserves the order of non-zero elements and moves zeroes to the end in O(n) time and O(1) extra space.",
    testCases: [
      { input: "0 1 0 3 12", output: "1 3 12 0 0" },
      { input: "0 0 1", output: "1 0 0" },
      { input: "1 2 3", output: "1 2 3" }
    ],
    examples: {
      JAVASCRIPT: {
        input: "nums = [0,1,0,3,12]",
        output: "[1,3,12,0,0]",
        explanation: "The non-zero elements keep their original relative order."
      },
      PYTHON: {
        input: "nums = [0,0,1]",
        output: "[1,0,0]",
        explanation: "The zeroes move to the end."
      },
      JAVA: {
        input: "nums = [1,2,3]",
        output: "[1,2,3]",
        explanation: "An array without zeroes remains unchanged."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function moveZeroes(nums) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  const nums = line.trim().split(/\s+/).map(Number);
  moveZeroes(nums);
  console.log(nums.join(' '));
  rl.close();
});`,
      PYTHON: `class Solution:
    def moveZeroes(self, nums):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    Solution().moveZeroes(nums)
    print(*nums)`,
      JAVA: `import java.util.*;

class Main {
    public void moveZeroes(int[] nums) {
        // Write your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .mapToInt(Integer::parseInt).toArray();
        new Main().moveZeroes(nums);
        System.out.println(Arrays.toString(nums));
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function moveZeroes(nums) {
  let write = 0;

  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      [nums[write], nums[read]] = [nums[read], nums[write]];
      write++;
    }
  }
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  const nums = line.trim().split(/\s+/).map(Number);
  moveZeroes(nums);
  console.log(nums.join(' '));
  rl.close();
});`,
      PYTHON: `class Solution:
    def moveZeroes(self, nums):
        write = 0

        for read in range(len(nums)):
            if nums[read] != 0:
                nums[write], nums[read] = nums[read], nums[write]
                write += 1

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    Solution().moveZeroes(nums)
    print(*nums)`,
      JAVA: `import java.util.*;

class Main {
    public void moveZeroes(int[] nums) {
        int write = 0;

        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                int temp = nums[write];
                nums[write] = nums[read];
                nums[read] = temp;
                write++;
            }
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .mapToInt(Integer::parseInt).toArray();
        new Main().moveZeroes(nums);
        System.out.println(Arrays.toString(nums));
    }
}`
    }
  },

  {
    title: "Squares of a Sorted Array",
    description: "Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.",
    difficulty: "EASY",
    tags: ["Array", "Two Pointers", "Sorting"],
    constraints: "1 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nnums is sorted in non-decreasing order.",
    hints: "The largest square must come from either the first or last element because the array is sorted.",
    editorial: "Use left and right pointers. Compare the absolute values at both ends and place the larger square at the end of the result array. Move the corresponding pointer and continue backwards. Time complexity O(n), extra space O(n).",
    testCases: [
      { input: "-4 -1 0 3 10", output: "0 1 9 16 100" },
      { input: "-7 -3 2 3 11", output: "4 9 9 49 121" },
      { input: "0", output: "0" }
    ],
    examples: {
      JAVASCRIPT: {
        input: "nums = [-4,-1,0,3,10]",
        output: "[0,1,9,16,100]",
        explanation: "Squaring the values and sorting them produces the result."
      },
      PYTHON: {
        input: "nums = [-7,-3,2,3,11]",
        output: "[4,9,9,49,121]",
        explanation: "The result contains all squares in ascending order."
      },
      JAVA: {
        input: "nums = [0]",
        output: "[0]",
        explanation: "The square of zero is zero."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function sortedSquares(nums) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  console.log(sortedSquares(line.trim().split(/\s+/).map(Number)).join(' '));
  rl.close();
});`,
      PYTHON: `class Solution:
    def sortedSquares(self, nums):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    print(*Solution().sortedSquares(nums))`,
      JAVA: `import java.util.*;

class Main {
    public int[] sortedSquares(int[] nums) {
        // Write your code here
        return new int[nums.length];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .mapToInt(Integer::parseInt).toArray();
        int[] result = new Main().sortedSquares(nums); 
        String output = Arrays.stream(result) 
                              .mapToObj(String::valueOf) 
                              .collect(java.util.stream.Collectors.joining(" ")); 
        
        System.out.println(output);
    }
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function sortedSquares(nums) {
  const result = new Array(nums.length);
  let left = 0;
  let right = nums.length - 1;
  let write = nums.length - 1;

  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    if (leftSquare > rightSquare) {
      result[write--] = leftSquare;
      left++;
    } else {
      result[write--] = rightSquare;
      right--;
    }
  }

  return result;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', line => {
  console.log(sortedSquares(line.trim().split(/\s+/).map(Number)).join(' '));
  rl.close();
});`,
      PYTHON: `class Solution:
    def sortedSquares(self, nums):
        result = [0] * len(nums)
        left, right = 0, len(nums) - 1
        write = len(nums) - 1

        while left <= right:
            left_square = nums[left] ** 2
            right_square = nums[right] ** 2

            if left_square > right_square:
                result[write] = left_square
                left += 1
            else:
                result[write] = right_square
                right -= 1

            write -= 1

        return result

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().split()))
    print(*Solution().sortedSquares(nums))`,
      JAVA: `import java.util.*;

class Main {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        int left = 0, right = n - 1, write = n - 1;

        while (left <= right) {
            int leftSquare = nums[left] * nums[left];
            int rightSquare = nums[right] * nums[right];

            if (leftSquare > rightSquare) {
                result[write--] = leftSquare;
                left++;
            } else {
                result[write--] = rightSquare;
                right--;
            }
        }

        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] nums = Arrays.stream(sc.nextLine().trim().split("\\s+"))
            .mapToInt(Integer::parseInt).toArray();
        int[] result = new Main().sortedSquares(nums);
        String output = Arrays.stream(result)
            .mapToObj(String::valueOf)
            .collect(java.util.stream.Collectors.joining(" "));
        System.out.println(output);
    }
}`
    }
  },
  {
    title: "Merge Sorted Array",
    description: "Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array. nums1 has enough space to hold all elements, with its first m elements valid and its remaining n elements set to 0.",
    difficulty: "EASY",
    tags: ["Array", "Two Pointers", "Sorting"],
    constraints: "nums1.length == m + n\nnums2.length == n\n0 <= m, n <= 200\n-10^9 <= nums1[i], nums2[j] <= 10^9\nBoth arrays are sorted in non-decreasing order.",
    hints: "Fill nums1 from the end. Compare the largest remaining elements and place the larger one at the last available position.",
    editorial: "Use three pointers: one at m - 1, one at n - 1, and one at m + n - 1. Place the larger element at the last pointer and move backward. Any remaining elements in nums2 must be copied. Time complexity O(m + n), auxiliary space O(1).",
    testCases: [
      { input: "3 3\n1 2 3\n2 5 6", output: "1 2 2 3 5 6" },
      { input: "1 0\n1\n", output: "1" },
      { input: "0 1\n\n1", output: "1" }
    ],
    examples: {
      JAVASCRIPT: {
        input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        output: "[1,2,2,3,5,6]",
        explanation: "The two sorted arrays are merged into nums1 in non-decreasing order."
      },
      PYTHON: {
        input: "nums1 = [1], m = 1, nums2 = [], n = 0",
        output: "[1]",
        explanation: "There are no elements to merge from nums2."
      },
      JAVA: {
        input: "nums1 = [0], m = 0, nums2 = [1], n = 1",
        output: "[1]",
        explanation: "All valid elements come from nums2."
      }
    },
    codeSnippets: {
      JAVASCRIPT: `function merge(nums1, m, nums2, n) {
  // Write your code here
}

const fs = require('fs'); 
const lines = fs.readFileSync(0, 'utf8').trim().split(/\n/); 
const [m, n] = lines[0].trim().split(/\s+/).map(Number); 

const nums1 = lines[1] && lines[1].trim() ? lines[1].trim().split(/\s+/).map(Number) : []; 
const nums2 = lines[2] && lines[2].trim() ? lines[2].trim().split(/\s+/).map(Number) : []; 

merge(nums1, m, nums2, n); 
console.log(nums1.join(' '));`,
      PYTHON: `class Solution:
    def merge(self, nums1, m, nums2, n):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    m, n = map(int, lines[0].split())
    nums1 = list(map(int, lines[1].split())) if lines[1].strip() else []
    nums2 = list(map(int, lines[2].split())) if len(lines) > 2 and lines[2].strip() else []
    if len(nums1) < m + n:
        nums1.extend([0] * (m + n - len(nums1)))
        
    Solution().merge(nums1, m, nums2, n)
    print(*nums1)`,
      JAVA: `import java.util.*;

class Main {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Write your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return; // Safe guard for completely empty input
        
        int m = sc.nextInt();
        int n = sc.nextInt();
        
        int[] nums1 = new int[m + n];
        int[] nums2 = new int[n];
        
        for (int i = 0; i < m; i++) {
            nums1[i] = sc.nextInt();
        }

        for (int i = 0; i < n; i++) {
            nums2[i] = sc.nextInt();
        }
        
        new Main().merge(nums1, m, nums2, n);
        
        for (int i = 0; i < nums1.length; i++) {
            if (i > 0) System.out.print(" ");
            System.out.print(nums1[i]);
        }
        System.out.println();
    }
}
}`
    },
    referenceSolutions: {
      JAVASCRIPT: `function merge(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
    else nums1[k--] = nums2[j--];
  }
}
const fs = require('fs'); 
const lines = fs.readFileSync(0, 'utf8').trim().split(/\n/); 
const [m, n] = lines[0].trim().split(/\s+/).map(Number); 

const nums1 = lines[1] && lines[1].trim() ? lines[1].trim().split(/\s+/).map(Number) : []; 
const nums2 = lines[2] && lines[2].trim() ? lines[2].trim().split(/\s+/).map(Number) : []; 

merge(nums1, m, nums2, n); 
console.log(nums1.join(' '));`,
      PYTHON: `class Solution:
    def merge(self, nums1, m, nums2, n):
        i, j, k = m - 1, n - 1, m + n - 1
        while j >= 0:
            if i >= 0 and nums1[i] > nums2[j]:
                nums1[k] = nums1[i]
                i -= 1
            else:
                nums1[k] = nums2[j]
                j -= 1
            k -= 1
            if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().splitlines()
    m, n = map(int, lines[0].split())
    nums1 = list(map(int, lines[1].split())) if lines[1].strip() else []
    nums2 = list(map(int, lines[2].split())) if len(lines) > 2 and lines[2].strip() else []
    if len(nums1) < m + n:
        nums1.extend([0] * (m + n - len(nums1)))
        
    Solution().merge(nums1, m, nums2, n)
    print(*nums1)`,
      JAVA: `import java.util.*;

class Main {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
    }
        public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return; // Safe guard for completely empty input
        
        int m = sc.nextInt();
        int n = sc.nextInt();
        
        int[] nums1 = new int[m + n];
        int[] nums2 = new int[n];
        
        for (int i = 0; i < m; i++) {
            nums1[i] = sc.nextInt();
        }

        for (int i = 0; i < n; i++) {
            nums2[i] = sc.nextInt();
        }
        
        new Main().merge(nums1, m, nums2, n);
        
        for (int i = 0; i < nums1.length; i++) {
            if (i > 0) System.out.print(" ");
            System.out.print(nums1[i]);
        }
        System.out.println();
    }
}
}`
    }
  },
]