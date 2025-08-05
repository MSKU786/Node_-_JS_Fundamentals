// Online Java Compiler
// Use this editor to write, compile and run your Java code online


class ExamRoom() {
    PriorityQueue<int[]> pq;
    int count = 0;
    int n;
    
    public ExamRoom(int n) {
        this.n = n;
        this.pq = new PriorityQueue<int[]>((a,b) -> b[0]-a[0])
    }
    
    public int seats(){
        if (count == n)
            return -1;
     
        
        int[] current = pq.poll();
        
 
        int mid = (current[2]-current[1])/2;
            
        if (mid-current[1]>1) {
            int newSegment[] = new int[3];
            newSegment[0] = mid-current[1];
            newSegment[1] = current[1];
            newSegment[2] = mid;
            pq.add(newSegment);
            this.count++;
        }
        
        if (current[2] - mid > 1) {
            int newSegment[] = new int[3];
            newSegment[0] = current[2] - mid 
            newSegment[1] = mid;
            newSegment[2] = current[2];
            pq.add(newSegment);
            this.count++;
        }
        return mid;
    }
}

class Main { 
    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
        ExamRoom
    }
}