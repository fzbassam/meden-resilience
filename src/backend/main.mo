import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Map "mo:core/Map";

actor {
  type DemoRequest = {
    name : Text;
    email : Text;
    organization : Text;
    message : Text;
    timestamp : Int;
  };

  module DemoRequest {
    public func compare(request1 : DemoRequest, request2 : DemoRequest) : Order.Order {
      Int.compare(request1.timestamp, request2.timestamp);
    };
  };

  let requests = Map.empty<Int, DemoRequest>();

  let admin = Principal.fromText("2vxsx-fae");

  public shared ({ caller }) func submitDemoRequest(name : Text, email : Text, organization : Text, message : Text) : async Text {
    let request : DemoRequest = {
      name;
      email;
      organization;
      message;
      timestamp = Time.now();
    };
    requests.add(request.timestamp, request);
    "Your demo request has been submitted successfully!";
  };

  public shared ({ caller }) func getAllRequests() : async [DemoRequest] {
    if (caller != admin) { Runtime.trap("Unauthorized") };
    requests.values().toArray().sort().reverse();
  };
};
