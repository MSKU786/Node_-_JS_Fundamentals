import java.util.PriorityQueue;

class ExamRoom {

    private int N;
    private PriorityQueue<Interval> pq;

    // Interval class
    private class Interval {
        int start;
        int end;

        Interval(int s, int e) {
            this.start = s;
            this.end = e;
        }

        int getDistance() {
            if (start == 0) {
                return end;
            }
            if (end == N - 1) {
                return N - 1 - start;
            }
            return (end - start) / 2;
        }
    }

    public ExamRoom(int n) {
        this.N = n;

        pq = new PriorityQueue<>((a, b) -> {
            int distA = a.getDistance();
            int distB = b.getDistance();

            if (distA != distB) {
                return distB - distA; // max heap
            }
            return a.start - b.start; // leftmost
        });

        // Initially whole room is empty
        pq.offer(new Interval(0, N - 1));
    }

    public int seat() {
        Interval curr = pq.poll();
        int seat;

        if (curr.start == 0) {
            seat = 0;
        } else if (curr.end == N - 1) {
            seat = N - 1;
        } else {
            seat = (curr.start + curr.end) / 2;
        }

        // Left interval
        if (seat > curr.start) {
            pq.offer(new Interval(curr.start, seat - 1));
        }

        // Right interval
        if (seat < curr.end) {
            pq.offer(new Interval(seat + 1, curr.end));
        }

        return seat;
    }

    public void leave(int p) {
        Interval left = null;
        Interval right = null;

        for (Interval in : pq) {
            if (in.end + 1 == p) left = in;
            if (in.start - 1 == p) right = in;
        }

        if (left != null) pq.remove(left);
        if (right != null) pq.remove(right);

        int newStart = (left == null) ? p : left.start;
        int newEnd = (right == null) ? p : right.end;

        pq.offer(new Interval(newStart, newEnd));
    }
}


public class Main {
    public static void main(String[] args) {
        ExamRoom room = new ExamRoom(10);

        System.out.println("Student sits at: " + room.seat()); // 0
        System.out.println("Student sits at: " + room.seat()); // 9
        System.out.println("Student sits at: " + room.seat()); // 4
        System.out.println("Student sits at: " + room.seat()); // 2
        System.out.println("Student sits at: " + room.seat()); // 6
    }
}
