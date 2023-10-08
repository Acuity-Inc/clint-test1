/*! @file OKTEndSessionResponse.m
    @brief AppAuth iOS SDK
    @copyright
        Copyright 2017 The AppAuth Authors. All Rights Reserved.
    @copydetails
        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
 
        http://www.apache.org/licenses/LICENSE-2.0
 
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
    @modifications
        Copyright (C) 2019 Okta Inc.
 */

#import "OKTEndSessionResponse.h"

#import "OKTDefines.h"
#import "OKTEndSessionRequest.h"
#import "OKTFieldMapping.h"

/*! @brief The key for the @c state property in the incoming parameters and for @c NSSecureCoding.
 */
static NSString *const kStateKey = @"state";

/*! @brief Key used to encode the @c request property for @c NSSecureCoding
 */
static NSString *const kRequestKey = @"request";

/*! @brief Key used to encode the @c additionalParameters property for
 @c NSSecureCoding
 */
static NSString *const kAdditionalParametersKey = @"additionalParameters";

@implementation OKTEndSessionResponse

#pragma mark - Initializers

- (instancetype)init
    OKT_UNAVAILABLE_USE_INITIALIZER(@selector(initWithRequest:parameters:))

- (instancetype)initWithRequest:(OKTEndSessionRequest *)request
                     parameters:(NSDictionary<NSString *,NSObject<NSCopying> *> *)parameters {
  self = [super init];
  if (self) {
    _request = [request copy];
    NSDictionary<NSString *, NSObject<NSCopying> *> *additionalParameters =
    [OKTFieldMapping remainingParametersWithMap:[[self class] fieldMap]
                                     parameters:parameters
                                       instance:self];
    _additionalParameters = additionalParameters;
  }
  return self;
}

/*! @brief Returns a mapping of incoming parameters to instance variables.
    @return A mapping of incoming parameters to instance variables.
 */
+ (NSDictionary<NSString *, OKTFieldMapping *> *)fieldMap {
  static NSMutableDictionary<NSString *, OKTFieldMapping *> *fieldMap;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    fieldMap = [NSMutableDictionary dictionary];
    fieldMap[kStateKey] =
        [[OKTFieldMapping alloc] initWithName:@"_state" type:[NSString class]];
  });
  return fieldMap;
}

#pragma mark - NSCopying

- (instancetype)copyWithZone:(nullable NSZone *)zone {
  // The documentation for NSCopying specifically advises us to return a reference to the original
  // instance in the case where instances are immutable (as ours is):
  // "Implement NSCopying by retaining the original instead of creating a new copy when the class
  // and its contents are immutable."
  return self;
}

#pragma mark - NSSecureCoding

+ (BOOL)supportsSecureCoding {
  return YES;
}

- (instancetype)initWithCoder:(NSCoder *)aDecoder {
  OKTEndSessionRequest *request =
      [aDecoder decodeObjectOfClass:[OKTEndSessionRequest class] forKey:kRequestKey];
  self = [self initWithRequest:request parameters:@{ }];
  if (self) {
    [OKTFieldMapping decodeWithCoder:aDecoder map:[[self class] fieldMap] instance:self];
    _additionalParameters = [aDecoder decodeObjectOfClasses:[OKTFieldMapping JSONTypes]
                                                     forKey:kAdditionalParametersKey];
  }
  return self;
}

- (void)encodeWithCoder:(NSCoder *)aCoder {
  [aCoder encodeObject:_request forKey:kRequestKey];
  [OKTFieldMapping encodeWithCoder:aCoder map:[[self class] fieldMap] instance:self];
  [aCoder encodeObject:_additionalParameters forKey:kAdditionalParametersKey];
}

#pragma mark - NSObject overrides

- (NSString *)description {
  return [NSString stringWithFormat:@"<%@: %p, state: \"%@\", "
          "additionalParameters: %@, request: %@>",
          NSStringFromClass([self class]),
          (void *)self,
          _state,
          _additionalParameters,
          _request];
}
@end
